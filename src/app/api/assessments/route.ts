import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get('courseId') || undefined;

    const assessments = db.getAssessments(courseId);
    const courses = db.getCourses();
    const courseMap = new Map(courses.map((c) => [c.id, c]));

    const enrichedAssessments = assessments.map((a) => {
      const course = courseMap.get(a.courseId);
      const attempts = db.getAttemptsByAssessment(a.id);
      const rooms = db.getRoomsByAssessmentId(a.id);
      const activeRoom = rooms.find((r) => r.status === 'ACTIVE') || rooms[0];

      let avgScore = 0;
      if (attempts.length > 0) {
        const sum = attempts.reduce((acc, curr) => acc + curr.percentageScore, 0);
        avgScore = Math.round(sum / attempts.length);
      }

      return {
        id: a.id,
        title: a.title,
        moduleName: a.moduleName,
        courseName: course?.name || 'Computer Science',
        courseCode: course?.code || 'CS',
        totalQuestions: a.questionIds.length,
        durationMinutes: a.settings.durationMinutes,
        status: a.status,
        participants: attempts.length,
        averageScore: avgScore,
        roomCode: activeRoom?.code || null,
        createdAt: a.createdAt,
      };
    });

    return NextResponse.json({
      success: true,
      assessments: enrichedAssessments,
    });
  } catch (err: any) {
    console.error('Assessments fetch error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to fetch assessments' },
      { status: 500 }
    );
  }
}
