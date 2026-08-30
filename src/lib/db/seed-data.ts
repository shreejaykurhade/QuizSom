import { 
  User, 
  Course, 
  DocumentMaterial, 
  Question, 
  Assessment, 
  LiveRoom, 
  ExamAttempt,
  IntegrityEvent
} from './types';

export const SEED_USERS: User[] = [
  {
    id: 'user_prof_arvind',
    name: 'Dr. Arvind Ramanathan',
    email: 'arvind.ramanathan@university.edu',
    role: 'TEACHER',
    department: 'Computer Science & Engineering',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'user_student_aarav',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@student.university.edu',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    studentId: '2024CS1048',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'user_student_ananya',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@student.university.edu',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    studentId: '2024CS1012',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'user_student_rohan',
    name: 'Rohan Patil',
    email: 'rohan.patil@student.university.edu',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    studentId: '2024CS1089',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'user_student_priya',
    name: 'Priya Shah',
    email: 'priya.shah@student.university.edu',
    role: 'STUDENT',
    department: 'Computer Science & Engineering',
    studentId: '2024CS1064',
    createdAt: '2026-01-15T09:00:00Z',
  },
];

export const SEED_COURSES: Course[] = [
  {
    id: 'course_dbms_301',
    code: 'CS301',
    name: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 'Fall 2026 / Semester V',
    teacherId: 'user_prof_arvind',
    description: 'Relational model, query optimization, normalization, ACID properties, indexing and distributed database architectures.',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'course_os_302',
    code: 'CS302',
    name: 'Operating Systems & Concurrency',
    department: 'Computer Science & Engineering',
    semester: 'Fall 2026 / Semester V',
    teacherId: 'user_prof_arvind',
    description: 'Process scheduling, virtual memory management, deadlock prevention, and distributed file systems.',
    createdAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'course_cn_303',
    code: 'CS303',
    name: 'Computer Networks',
    department: 'Computer Science & Engineering',
    semester: 'Fall 2026 / Semester V',
    teacherId: 'user_prof_arvind',
    description: 'TCP/IP architecture, flow control, routing algorithms, transport protocols, and network security.',
    createdAt: '2026-01-10T10:00:00Z',
  },
];

export const SEED_DOCUMENT_TEXT = `
DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
COURSE: CS301 — DATABASE MANAGEMENT SYSTEMS
MODULE 2: RELATIONAL MODEL, FUNCTIONAL DEPENDENCIES & SCHEMA NORMALIZATION

--- PAGE 1 ---
SECTION 1: THE RELATIONAL MODEL & INTEGRITY CONSTRAINTS
A relational database is a collection of relations (tables). Each relation consists of a relational schema R(A1, A2, ..., An) and an instance r(R).
Key Constraints:
1. Superkey: A set of attributes K such that no two distinct tuples in relation r have the same value for K.
2. Candidate Key: A minimal superkey; a superkey K such that no proper subset of K is also a superkey.
3. Primary Key: The candidate key explicitly designated by the database designer.
4. Foreign Key: An attribute set in relation R1 that references the primary key of relation R2, enforcing referential integrity.
Entity Integrity requires that no primary key attribute may accept a NULL value. Referential integrity dictates that any foreign key value must either match an existing primary key value in the referenced relation or be completely NULL.

--- PAGE 2 ---
SECTION 2: FUNCTIONAL DEPENDENCIES (FD)
Let R be a relation schema, and let alpha and beta be subsets of attributes of R.
The functional dependency alpha -> beta holds on R if, in any valid relation instance r(R), for all pairs of tuples t1 and t2, if t1[alpha] = t2[alpha], then t1[beta] = t2[beta].
Armstrong's Axioms (Sound and Complete):
1. Reflexivity: If beta is a subset of alpha, then alpha -> beta.
2. Augmentation: If alpha -> beta, then gamma alpha -> gamma beta.
3. Transitivity: If alpha -> beta and beta -> gamma, then alpha -> gamma.
Secondary Rules:
- Union: If alpha -> beta and alpha -> gamma, then alpha -> beta gamma.
- Decomposition: If alpha -> beta gamma, then alpha -> beta and alpha -> gamma.
- Pseudo-transitivity: If alpha -> beta and gamma beta -> delta, then gamma alpha -> delta.
Closure of Attribute Sets: The set of all attributes functionally determined by alpha under a set of FDs F is denoted as alpha+.

--- PAGE 3 ---
SECTION 3: NORMAL FORMS & DECOMPOSITION CRITERIA
The primary goal of relational schema normalization is the elimination of data redundancy, insertion anomalies, deletion anomalies, and update anomalies while preserving data dependencies.

1. First Normal Form (1NF):
A relation schema R is in 1NF if and only if the domains of all attributes are atomic (indivisible values). Multi-valued attributes, nested relations, or composite attribute groups are strictly disallowed.

2. Second Normal Form (2NF):
A relation schema R is in 2NF if:
a) It is in 1NF, and
b) Every non-prime attribute is fully functionally dependent on every candidate key of R.
Definition of Partial Dependency: An FD alpha -> beta is a partial dependency if alpha is a proper subset of any candidate key and beta is a non-prime attribute. 2NF strictly eliminates partial dependencies.

--- PAGE 4 ---
SECTION 4: THIRD NORMAL FORM (3NF) & BOYCE-CODD NORMAL FORM (BCNF)
3. Third Normal Form (3NF):
A relation schema R is in 3NF if, whenever a non-trivial functional dependency alpha -> beta holds on R, either:
a) alpha is a superkey of R, OR
b) beta is a prime attribute (each attribute in beta is part of some candidate key).
3NF eliminates transitive dependencies of non-prime attributes on candidate keys.

4. Boyce-Codd Normal Form (BCNF):
A relation schema R is in BCNF if, for every non-trivial functional dependency alpha -> beta, alpha is a superkey of R.
Comparison:
- Every BCNF schema is always in 3NF, but a 3NF schema is not necessarily in BCNF.
- 3NF always guarantees both Lossless-Join Decomposition AND Dependency Preservation.
- BCNF always guarantees Lossless-Join Decomposition, but does NOT always guarantee Dependency Preservation.
- A decomposition of R into R1 and R2 is Lossless if and only if (R1 intersect R2) -> R1 OR (R1 intersect R2) -> R2.
`;

export const SEED_DOCUMENT: DocumentMaterial = {
  id: 'doc_dbms_mod2',
  courseId: 'course_dbms_301',
  title: 'DBMS Module 2: Relational Model & Normalization',
  fileName: 'DBMS_Module_2_Relational_Normalization.pdf',
  fileSize: 2457600,
  mimeType: 'application/pdf',
  pageCount: 4,
  rawText: SEED_DOCUMENT_TEXT,
  topics: ['Relational Model', 'Functional Dependencies', '1NF & 2NF', '3NF & BCNF', 'Lossless Decomposition'],
  status: 'INDEXED',
  uploadedAt: '2026-02-01T11:00:00Z',
  chunks: [
    {
      id: 'chunk_1',
      documentId: 'doc_dbms_mod2',
      chunkIndex: 0,
      pageNumber: 1,
      sectionTitle: 'Section 1: The Relational Model & Integrity Constraints',
      content: 'A relational database is a collection of relations (tables)... Superkey, Candidate Key, Primary Key, Foreign Key. Entity Integrity requires that no primary key attribute may accept NULL.',
      tokenEstimate: 240,
    },
    {
      id: 'chunk_2',
      documentId: 'doc_dbms_mod2',
      chunkIndex: 1,
      pageNumber: 2,
      sectionTitle: 'Section 2: Functional Dependencies & Armstrong Axioms',
      content: 'Armstrong Axioms: Reflexivity, Augmentation, Transitivity. Secondary rules: Union, Decomposition, Pseudo-transitivity. Closure of attribute set alpha+.',
      tokenEstimate: 310,
    },
    {
      id: 'chunk_3',
      documentId: 'doc_dbms_mod2',
      chunkIndex: 2,
      pageNumber: 3,
      sectionTitle: 'Section 3: First and Second Normal Form (1NF, 2NF)',
      content: '1NF requires atomic attribute domains. 2NF is in 1NF and eliminates partial dependencies where non-prime attributes depend on a proper subset of a candidate key.',
      tokenEstimate: 280,
    },
    {
      id: 'chunk_4',
      documentId: 'doc_dbms_mod2',
      chunkIndex: 3,
      pageNumber: 4,
      sectionTitle: 'Section 4: Third Normal Form (3NF), BCNF and Decomposition Criteria',
      content: '3NF requires alpha is superkey OR beta is prime. BCNF strictly requires alpha is superkey. 3NF guarantees dependency preservation; BCNF may not.',
      tokenEstimate: 340,
    },
  ],
};

export const SEED_QUESTIONS: Question[] = [
  {
    id: 'q_dbms_01',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: '1NF & 2NF',
    difficulty: 'easy',
    questionText: 'Which normal form specifically requires eliminating partial dependencies of non-prime attributes on candidate keys?',
    options: [
      { id: 'opt_1', text: 'First Normal Form (1NF)' },
      { id: 'opt_2', text: 'Second Normal Form (2NF)' },
      { id: 'opt_3', text: 'Third Normal Form (3NF)' },
      { id: 'opt_4', text: 'Boyce-Codd Normal Form (BCNF)' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'According to DBMS Module 2, Second Normal Form (2NF) mandates that every non-prime attribute is fully functionally dependent on every candidate key, thereby removing all partial functional dependencies.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 3,
      sectionTitle: 'Section 3: Normal Forms & Decomposition Criteria',
      excerpt: '2NF strictly eliminates partial dependencies where non-prime attributes depend on a proper subset of any candidate key.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_02',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: '3NF & BCNF',
    difficulty: 'medium',
    questionText: 'Under what condition does a functional dependency α → β satisfy Third Normal Form (3NF) but potentially violate Boyce-Codd Normal Form (BCNF)?',
    options: [
      { id: 'opt_1', text: 'When α is a superkey and β is non-prime' },
      { id: 'opt_2', text: 'When α is not a superkey, but β is a prime attribute' },
      { id: 'opt_3', text: 'When β is a non-prime attribute and α is a candidate key' },
      { id: 'opt_4', text: 'When both α and β are foreign keys' },
    ],
    correctOptionId: 'opt_2',
    explanation: '3NF relaxes the strict superkey rule by permitting α → β if β is a prime attribute (part of some candidate key), even if α is not a superkey. BCNF strictly disallows this and requires α to be a superkey in all non-trivial dependencies.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 4,
      sectionTitle: 'Section 4: Third Normal Form (3NF) & BCNF',
      excerpt: '3NF condition allows alpha is a superkey OR beta is a prime attribute. BCNF strictly requires alpha is a superkey.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_03',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Lossless Decomposition',
    difficulty: 'hard',
    questionText: 'A relation schema R is decomposed into R1 and R2. Which condition mathematically guarantees that the decomposition is a Lossless-Join Decomposition?',
    options: [
      { id: 'opt_1', text: '(R1 ∪ R2) → (R1 ∩ R2)' },
      { id: 'opt_2', text: '(R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2' },
      { id: 'opt_3', text: '(R1 ∩ R2) is an empty set' },
      { id: 'opt_4', text: 'R1 and R2 contain identical candidate keys' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'A decomposition of R into (R1, R2) is lossless if and only if the common attribute set (R1 ∩ R2) functionally determines at least one of the component relations: (R1 ∩ R2) → R1 or (R1 ∩ R2) → R2.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 4,
      sectionTitle: 'Section 4: Decomposition Criteria',
      excerpt: 'A decomposition of R into R1 and R2 is Lossless if and only if (R1 intersect R2) -> R1 OR (R1 intersect R2) -> R2.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_04',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Relational Model',
    difficulty: 'easy',
    questionText: 'What does the Entity Integrity constraint dictate in a relational database?',
    options: [
      { id: 'opt_1', text: 'Foreign keys must not reference nonexistent tables' },
      { id: 'opt_2', text: 'No primary key attribute value can be NULL' },
      { id: 'opt_3', text: 'Every table must have at least two candidate keys' },
      { id: 'opt_4', text: 'Domain values must be complex composite structures' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'Entity Integrity requires that no attribute comprising the primary key of a base relation may contain NULL values, ensuring each entity tuple remains distinctly identifiable.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 1,
      sectionTitle: 'Section 1: The Relational Model & Integrity Constraints',
      excerpt: 'Entity Integrity requires that no primary key attribute may accept a NULL value.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_05',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Functional Dependencies',
    difficulty: 'medium',
    questionText: 'According to Armstrong’s Axioms, which rule states: "If α → β, then γα → γβ for any attribute set γ"?',
    options: [
      { id: 'opt_1', text: 'Reflexivity Rule' },
      { id: 'opt_2', text: 'Augmentation Rule' },
      { id: 'opt_3', text: 'Transitivity Rule' },
      { id: 'opt_4', text: 'Pseudo-transitivity Rule' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'The Augmentation Axiom states that if α functionally determines β, adding attribute set γ to both sides maintains the dependency: γα → γβ.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 2,
      sectionTitle: 'Section 2: Functional Dependencies',
      excerpt: 'Armstrong Axioms 2. Augmentation: If alpha -> beta, then gamma alpha -> gamma beta.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_06',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: '1NF & 2NF',
    difficulty: 'easy',
    questionText: 'A table that contains a multi-valued attribute like "PhoneNumbers" storing comma-separated values violates which normal form?',
    options: [
      { id: 'opt_1', text: 'First Normal Form (1NF)' },
      { id: 'opt_2', text: 'Second Normal Form (2NF)' },
      { id: 'opt_3', text: 'Third Normal Form (3NF)' },
      { id: 'opt_4', text: 'BCNF' },
    ],
    correctOptionId: 'opt_1',
    explanation: '1NF requires all attribute domains to be atomic (single, indivisible values). Comma-separated multi-valued entries violate atomicity and fail 1NF.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 3,
      sectionTitle: 'Section 3: 1NF',
      excerpt: 'A relation schema R is in 1NF if and only if the domains of all attributes are atomic. Multi-valued attributes are strictly disallowed.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_07',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: '3NF & BCNF',
    difficulty: 'medium',
    questionText: 'What critical trade-off distinguishes 3NF decomposition from BCNF decomposition?',
    options: [
      { id: 'opt_1', text: 'BCNF guarantees dependency preservation while 3NF does not' },
      { id: 'opt_2', text: '3NF always guarantees dependency preservation, while BCNF may not' },
      { id: 'opt_3', text: '3NF requires atomic domains while BCNF allows nested tables' },
      { id: 'opt_4', text: 'BCNF produces more insertion anomalies than 3NF' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'A 3NF decomposition can always be achieved with both lossless join and dependency preservation. However, achieving BCNF may sometimes require sacrificing dependency preservation.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 4,
      sectionTitle: 'Section 4: Comparison of 3NF and BCNF',
      excerpt: '3NF always guarantees both Lossless-Join Decomposition AND Dependency Preservation. BCNF does NOT always guarantee Dependency Preservation.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_08',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Relational Model',
    difficulty: 'medium',
    questionText: 'What is the precise definition of a Candidate Key in relational database theory?',
    options: [
      { id: 'opt_1', text: 'Any attribute set that can accept duplicate entries' },
      { id: 'opt_2', text: 'A minimal superkey with no proper subset being a superkey' },
      { id: 'opt_3', text: 'An attribute that references another table’s foreign key' },
      { id: 'opt_4', text: 'Any set of attributes containing at least three columns' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'A candidate key is a minimal superkey; it uniquely identifies every tuple in the relation and removing any single attribute destroys this uniqueness property.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 1,
      sectionTitle: 'Section 1: Key Constraints',
      excerpt: 'Candidate Key: A minimal superkey; a superkey K such that no proper subset of K is also a superkey.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_09',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Functional Dependencies',
    difficulty: 'hard',
    questionText: 'Given relation R(A, B, C) with FDs {A → B, B → C}. What is the attribute closure of A (denoted A+)?',
    options: [
      { id: 'opt_1', text: '{A}' },
      { id: 'opt_2', text: '{A, B}' },
      { id: 'opt_3', text: '{A, B, C}' },
      { id: 'opt_4', text: '{B, C}' },
    ],
    correctOptionId: 'opt_3',
    explanation: 'Starting with {A}, A determines B (now {A, B}), and by transitivity B determines C (now {A, B, C}). Thus A+ = {A, B, C}, proving A is a candidate key.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 2,
      sectionTitle: 'Section 2: Closure of Attribute Sets',
      excerpt: 'Transitivity: If alpha -> beta and beta -> gamma, then alpha -> gamma. Closure of Attribute Sets.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_10',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: '3NF & BCNF',
    difficulty: 'medium',
    questionText: 'In Third Normal Form (3NF), what type of dependency is eliminated between non-prime attributes and candidate keys?',
    options: [
      { id: 'opt_1', text: 'Partial functional dependency' },
      { id: 'opt_2', text: 'Transitive functional dependency' },
      { id: 'opt_3', text: 'Trivial reflexivity dependency' },
      { id: 'opt_4', text: 'Referential foreign dependency' },
    ],
    correctOptionId: 'opt_2',
    explanation: '3NF eliminates transitive dependencies where a non-prime attribute depends on another non-prime attribute which in turn depends on the primary/candidate key.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 4,
      sectionTitle: 'Section 4: Third Normal Form',
      excerpt: '3NF eliminates transitive dependencies of non-prime attributes on candidate keys.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_11',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Functional Dependencies',
    difficulty: 'easy',
    questionText: 'Which Armstrong derived rule allows concluding α → β and α → γ from α → βγ?',
    options: [
      { id: 'opt_1', text: 'Decomposition Rule' },
      { id: 'opt_2', text: 'Union Rule' },
      { id: 'opt_3', text: 'Augmentation Rule' },
      { id: 'opt_4', text: 'Transitivity Rule' },
    ],
    correctOptionId: 'opt_1',
    explanation: 'The Decomposition rule (or Projectivity) states that if α functionally determines the attribute set βγ, then α independently determines β and α determines γ.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 2,
      sectionTitle: 'Section 2: Secondary Rules',
      excerpt: 'Decomposition: If alpha -> beta gamma, then alpha -> beta and alpha -> gamma.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_12',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Relational Model',
    difficulty: 'medium',
    questionText: 'What is Referential Integrity in the context of relational database schemas?',
    options: [
      { id: 'opt_1', text: 'Every relation must contain at least one integer column' },
      { id: 'opt_2', text: 'Foreign key values must match a referenced primary key or be NULL' },
      { id: 'opt_3', text: 'Database transactions must satisfy durability only' },
      { id: 'opt_4', text: 'Tuples must be sorted alphabetically by primary key' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'Referential integrity requires that any foreign key value in a referencing table must match an existing primary key value in the referenced table, or be NULL.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 1,
      sectionTitle: 'Section 1: Key Constraints',
      excerpt: 'Referential integrity dictates that any foreign key value must either match an existing primary key value or be completely NULL.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_13',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: '1NF & 2NF',
    difficulty: 'hard',
    questionText: 'Consider relation R(StudentID, CourseID, StudentName, Grade) with candidate key {StudentID, CourseID} and FD StudentID → StudentName. Why does R violate 2NF?',
    options: [
      { id: 'opt_1', text: 'Grade is a prime attribute' },
      { id: 'opt_2', text: 'StudentName depends on a proper subset (StudentID) of the candidate key' },
      { id: 'opt_3', text: 'StudentID contains atomic integers' },
      { id: 'opt_4', text: 'CourseID has transitive dependency on Grade' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'The candidate key is composite: {StudentID, CourseID}. The non-prime attribute StudentName depends solely on StudentID (a proper subset of candidate key), which is a partial dependency violating 2NF.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 3,
      sectionTitle: 'Section 3: Second Normal Form (2NF)',
      excerpt: 'Partial Dependency: An FD alpha -> beta is partial if alpha is a proper subset of any candidate key and beta is non-prime.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_14',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: '3NF & BCNF',
    difficulty: 'hard',
    questionText: 'If a relation schema is already in Boyce-Codd Normal Form (BCNF), what can be strictly stated about its 3NF compliance?',
    options: [
      { id: 'opt_1', text: 'It may or may not be in 3NF depending on foreign keys' },
      { id: 'opt_2', text: 'It is always guaranteed to be in 3NF' },
      { id: 'opt_3', text: 'It is in 3NF only if it has exactly two attributes' },
      { id: 'opt_4', text: 'It violates 3NF because BCNF has no prime attribute allowance' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'BCNF is a stricter subclass of 3NF. Every relation schema that satisfies BCNF automatically satisfies 3NF conditions without exception.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 4,
      sectionTitle: 'Section 4: Comparison of 3NF and BCNF',
      excerpt: 'Every BCNF schema is always in 3NF, but a 3NF schema is not necessarily in BCNF.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'q_dbms_15',
    assessmentId: 'assess_dbms_ia01',
    courseId: 'course_dbms_301',
    topic: 'Lossless Decomposition',
    difficulty: 'medium',
    questionText: 'What is the primary motivation for performing relational schema normalization in enterprise database systems?',
    options: [
      { id: 'opt_1', text: 'To maximize disk storage usage through duplicated tuples' },
      { id: 'opt_2', text: 'To eliminate redundancy and prevent insertion, deletion, and update anomalies' },
      { id: 'opt_3', text: 'To eliminate the need for primary keys entirely' },
      { id: 'opt_4', text: 'To enforce all foreign keys to be composite integers' },
    ],
    correctOptionId: 'opt_2',
    explanation: 'Relational normalization methodically structures schemas to eliminate unnecessary redundancy and safeguard against insertion, update, and deletion anomalies while maintaining data consistency.',
    sourceCitation: {
      documentId: 'doc_dbms_mod2',
      documentTitle: 'DBMS Module 2: Relational Model & Normalization',
      pageNumber: 3,
      sectionTitle: 'Section 3: Normal Forms & Decomposition Criteria',
      excerpt: 'The primary goal of relational schema normalization is the elimination of data redundancy, insertion anomalies, deletion anomalies, and update anomalies.',
    },
    isValidated: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
];

export const SEED_ASSESSMENT: Assessment = {
  id: 'assess_dbms_ia01',
  courseId: 'course_dbms_301',
  teacherId: 'user_prof_arvind',
  title: 'DBMS — Internal Assessment 01',
  moduleName: 'Module 2: Relational Model & Normalization',
  description: 'Proctored college internal assessment evaluating knowledge of relational constraints, functional dependencies, 1NF, 2NF, 3NF, BCNF, and lossless decomposition.',
  materialDocumentIds: ['doc_dbms_mod2'],
  questionIds: SEED_QUESTIONS.map((q) => q.id),
  settings: {
    durationMinutes: 15,
    totalQuestions: 15,
    difficultyDistribution: 'mixed',
    randomizeQuestions: true,
    randomizeOptions: true,
    positiveMarks: 1.0,
    negativeMarks: 0.25,
    allowReviewAfterSubmit: true,
    showLeaderboard: 'PUBLIC',
    requireFullscreen: true,
    maxFullscreenViolations: 2,
  },
  status: 'PUBLISHED',
  publishedAt: '2026-02-02T12:00:00Z',
  createdAt: '2026-02-02T11:30:00Z',
  updatedAt: '2026-02-02T12:00:00Z',
};

export const SEED_ROOM: LiveRoom = {
  id: 'room_cs301a',
  code: 'CS301A',
  assessmentId: 'assess_dbms_ia01',
  teacherId: 'user_prof_arvind',
  status: 'ACTIVE',
  startedAt: '2026-02-02T14:00:00Z',
  participantCount: 48,
  createdAt: '2026-02-02T13:45:00Z',
};

export const SEED_ROOM_ALT: LiveRoom = {
  id: 'room_ia26x7',
  code: 'IA26X7',
  assessmentId: 'assess_dbms_ia01',
  teacherId: 'user_prof_arvind',
  status: 'ACTIVE',
  startedAt: '2026-02-02T14:00:00Z',
  participantCount: 48,
  createdAt: '2026-02-02T13:45:00Z',
};

// Generate 48 realistic student attempts with deterministic scores and tie-breakers
export function generateSeedAttempts(): ExamAttempt[] {
  const studentNames = [
    { name: 'Ananya Iyer', roll: '2024CS1012', scorePct: 96, durationSec: 521, fsExits: 0, tabs: 0 },
    { name: 'Rohan Patil', roll: '2024CS1089', scorePct: 92, durationSec: 552, fsExits: 1, tabs: 1 },
    { name: 'Kavya Subramanian', roll: '2024CS1034', scorePct: 92, durationSec: 614, fsExits: 0, tabs: 0 },
    { name: 'Vikram Nair', roll: '2024CS1095', scorePct: 88, durationSec: 580, fsExits: 0, tabs: 0 },
    { name: 'Aditi Rao', roll: '2024CS1005', scorePct: 88, durationSec: 642, fsExits: 0, tabs: 1 },
    { name: 'Sameer Joshi', roll: '2024CS1077', scorePct: 84, durationSec: 590, fsExits: 0, tabs: 0 },
    { name: 'Aarav Sharma', roll: '2024CS1048', scorePct: 82, durationSec: 702, fsExits: 0, tabs: 2 },
    { name: 'Tanya Mehta', roll: '2024CS1091', scorePct: 80, durationSec: 620, fsExits: 0, tabs: 0 },
    { name: 'Siddharth Verma', roll: '2024CS1082', scorePct: 78, durationSec: 685, fsExits: 0, tabs: 0 },
    { name: 'Divya Nambiar', roll: '2024CS1023', scorePct: 76, durationSec: 710, fsExits: 0, tabs: 0 },
    { name: 'Karthik Raja', roll: '2024CS1031', scorePct: 74, durationSec: 690, fsExits: 0, tabs: 0 },
    { name: 'Meera Menon', roll: '2024CS1055', scorePct: 74, durationSec: 730, fsExits: 0, tabs: 0 },
    { name: 'Arjun Sen', roll: '2024CS1018', scorePct: 72, durationSec: 640, fsExits: 0, tabs: 1 },
    { name: 'Sneha Kulkarni', roll: '2024CS1086', scorePct: 70, durationSec: 760, fsExits: 0, tabs: 0 },
    { name: 'Harish Sundaram', roll: '2024CS1027', scorePct: 68, durationSec: 790, fsExits: 0, tabs: 0 },
    { name: 'Pooja Hegde', roll: '2024CS1061', scorePct: 66, durationSec: 810, fsExits: 0, tabs: 0 },
    { name: 'Nikhil Saxena', roll: '2024CS1058', scorePct: 64, durationSec: 780, fsExits: 0, tabs: 0 },
    { name: 'Ishaan Gupta', roll: '2024CS1029', scorePct: 62, durationSec: 820, fsExits: 0, tabs: 0 },
    { name: 'Ritika Deshmukh', roll: '2024CS1074', scorePct: 60, durationSec: 840, fsExits: 0, tabs: 0 },
    { name: 'Priya Shah', roll: '2024CS1064', scorePct: 54, durationSec: 410, fsExits: 2, tabs: 1, autoSubmit: 'FULLSCREEN_VIOLATION_LIMIT_EXCEEDED' },
    { name: 'Devendra Pillai', roll: '2024CS1021', scorePct: 48, durationSec: 880, fsExits: 0, tabs: 3 },
    { name: 'Manish Bhat', roll: '2024CS1052', scorePct: 42, durationSec: 890, fsExits: 0, tabs: 0 },
    { name: 'Gaurav Tiwari', roll: '2024CS1025', scorePct: 38, durationSec: 900, fsExits: 0, tabs: 1 },
  ];

  return studentNames.map((s, idx) => {
    const totalQ = 15;
    const correctCount = Math.round((s.scorePct / 100) * totalQ);
    const incorrectCount = totalQ - correctCount;
    const rawScore = correctCount * 1.0 - (incorrectCount * 0.25);
    const percentage = Math.max(0, Math.round((rawScore / totalQ) * 100));

    const integrityEvents: IntegrityEvent[] = [];
    if (s.fsExits > 0) {
      integrityEvents.push({
        id: `ev_fs1_${idx}`,
        attemptId: `attempt_${idx}`,
        studentId: `std_${s.roll}`,
        eventType: 'FULLSCREEN_EXIT',
        timestamp: '2026-02-02T14:06:12Z',
        questionIndex: 4,
        timeRemainingSeconds: 530,
      });
      if (s.fsExits > 1) {
        integrityEvents.push({
          id: `ev_fs2_${idx}`,
          attemptId: `attempt_${idx}`,
          studentId: `std_${s.roll}`,
          eventType: 'FULLSCREEN_EXIT',
          timestamp: '2026-02-02T14:08:45Z',
          questionIndex: 7,
          timeRemainingSeconds: 380,
          metadata: { autoSubmitted: true },
        });
      }
    }
    if (s.tabs > 0) {
      for (let t = 0; t < s.tabs; t++) {
        integrityEvents.push({
          id: `ev_tab_${idx}_${t}`,
          attemptId: `attempt_${idx}`,
          studentId: `std_${s.roll}`,
          eventType: 'TAB_SWITCH',
          timestamp: `2026-02-02T14:0${3 + t * 2}:20Z`,
          questionIndex: 2 + t,
          timeRemainingSeconds: 700 - t * 120,
        });
      }
    }

    const answers: Record<string, any> = {};
    SEED_QUESTIONS.forEach((q, qIdx) => {
      const isCorrect = qIdx < correctCount;
      const selectedOptionId = isCorrect 
        ? q.correctOptionId 
        : q.options.find(o => o.id !== q.correctOptionId)?.id || 'opt_1';
      
      answers[q.id] = {
        questionId: q.id,
        selectedOptionId,
        isAnswered: true,
        isCorrect,
        earnedMarks: isCorrect ? 1.0 : -0.25,
        answeredAt: `2026-02-02T14:0${Math.floor(qIdx / 2)}:30Z`,
      };
    });

    const isAutoSubmit = Boolean(s.autoSubmit);

    return {
      id: `attempt_${idx}`,
      roomId: 'room_cs301a',
      assessmentId: 'assess_dbms_ia01',
      studentId: `std_${s.roll}`,
      studentName: s.name,
      studentRollNo: s.roll,
      status: isAutoSubmit ? 'AUTO_SUBMITTED' : 'COMPLETED',
      startedAt: '2026-02-02T14:00:00Z',
      expiresAt: '2026-02-02T14:15:00Z',
      submittedAt: `2026-02-02T14:${String(Math.floor(s.durationSec / 60)).padStart(2, '0')}:${String(s.durationSec % 60).padStart(2, '0')}Z`,
      completionDurationSeconds: s.durationSec,
      assignedQuestionIds: SEED_QUESTIONS.map(q => q.id),
      assignedOptionOrders: {},
      answers,
      totalQuestions: totalQ,
      answeredCount: totalQ,
      unansweredCount: 0,
      correctCount,
      incorrectCount,
      score: parseFloat(rawScore.toFixed(2)),
      percentageScore: percentage,
      fullscreenViolationCount: s.fsExits,
      tabSwitchCount: s.tabs,
      integrityEvents,
      autoSubmitReason: s.autoSubmit,
      performanceSummary: {
        strongTopics: ['1NF & 2NF', 'Relational Model'],
        weakTopics: ['3NF & BCNF', 'Lossless Decomposition'],
        revisionAdvice: [
          'Review Armstrong Axioms secondary decomposition rules',
          'Practice verifying lossless join condition: (R1 ∩ R2) → R1 or (R1 ∩ R2) → R2',
          'Clarify the prime attribute exception in 3NF vs strict superkey in BCNF',
        ],
        pedagogicalFeedback: 'Strong mastery in fundamental key constraints and first/second normal form. Focus revision on relational decomposition testing and dependency preservation.',
      },
    };
  });
}
