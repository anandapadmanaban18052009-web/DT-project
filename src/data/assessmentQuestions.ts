import { AssessmentQuestion } from '../types';

export const ASSESSMENT_SKILL_CATEGORIES: {
  category: string;
  skills: string[];
}[] = [
  {
    category: 'Programming',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript']
  },
  {
    category: 'Data Science',
    skills: ['SQL', 'Statistics', 'Pandas', 'NumPy', 'Data Visualization', 'Machine Learning']
  },
  {
    category: 'Artificial Intelligence',
    skills: ['Deep Learning', 'Neural Networks', 'Natural Language Processing', 'Generative AI']
  },
  {
    category: 'Business & Web Technologies',
    skills: ['Excel', 'Power BI', 'HTML', 'CSS', 'React']
  }
];

export const ALL_ASSESSMENT_SKILLS = ASSESSMENT_SKILL_CATEGORIES.flatMap(c => c.skills);

export const ASSESSMENT_QUESTION_BANK: Record<string, AssessmentQuestion[]> = {
  // 1. Python
  'Python': [
    {
      id: 'py-1',
      skill: 'Python',
      question: 'Which of the following creates a dictionary with keys "a" and "b" initialized to 0?',
      options: ['dict.fromkeys(["a", "b"], 0)', 'dict(["a", "b"] = 0)', '{ "a", "b": 0 }', 'dict.create(["a", "b"], 0)'],
      correctIndex: 0,
      explanation: 'dict.fromkeys(iterable, value) creates a new dictionary with keys from iterable and values set to value.',
      difficulty: 'Beginner'
    },
    {
      id: 'py-2',
      skill: 'Python',
      question: 'What is the primary difference between a list and a tuple in Python?',
      options: ['Tuples can only hold numbers', 'Lists are mutable while tuples are immutable', 'Lists cannot be sliced', 'Tuples use square brackets and lists use parentheses'],
      correctIndex: 1,
      explanation: 'Lists are mutable (can be changed after creation), whereas tuples are immutable and hashable.',
      difficulty: 'Beginner'
    },
    {
      id: 'py-3',
      skill: 'Python',
      question: 'What does the `*args` and `**kwargs` syntax represent in function definitions?',
      options: ['Pointer dereferencing and reference parameters', 'Variable positional arguments and variable keyword arguments', 'Multiplication and exponentiation operators', 'Required positional and optional boolean arguments'],
      correctIndex: 1,
      explanation: '*args collects extra positional arguments into a tuple, while **kwargs collects extra keyword arguments into a dictionary.',
      difficulty: 'Intermediate'
    },
    {
      id: 'py-4',
      skill: 'Python',
      question: 'Which built-in function returns an iterator that yields tuples of (index, item) from a sequence?',
      options: ['zip()', 'map()', 'enumerate()', 'range()'],
      correctIndex: 2,
      explanation: 'enumerate(iterable) yields (index, item) pairs, simplifying counting in loops.',
      difficulty: 'Beginner'
    },
    {
      id: 'py-5',
      skill: 'Python',
      question: 'What will `[x**2 for x in range(5) if x % 2 == 0]` evaluate to?',
      options: ['[0, 4, 16]', '[1, 9]', '[0, 1, 4, 9, 16]', '[4, 16]'],
      correctIndex: 0,
      explanation: 'range(5) gives 0, 1, 2, 3, 4. Even numbers are 0, 2, 4. Their squares are 0, 4, 16.',
      difficulty: 'Intermediate'
    }
  ],

  // 2. Java
  'Java': [
    {
      id: 'java-1',
      skill: 'Java',
      question: 'Which keyword prevents a Java class from being subclassed / inherited?',
      options: ['static', 'sealed', 'abstract', 'final'],
      correctIndex: 3,
      explanation: 'Applying the `final` keyword to a class definition prevents it from being extended by any other class.',
      difficulty: 'Beginner'
    },
    {
      id: 'java-2',
      skill: 'Java',
      question: 'What is the storage location of object instances in Java runtime memory?',
      options: ['Stack Memory', 'Heap Memory', 'Program Counter', 'Static Register'],
      correctIndex: 1,
      explanation: 'In Java, all object instances are dynamically allocated on the Heap memory, while method references live on the Stack.',
      difficulty: 'Intermediate'
    },
    {
      id: 'java-3',
      skill: 'Java',
      question: 'Which collection implementation does NOT allow duplicate elements and is unordered?',
      options: ['ArrayList', 'HashSet', 'LinkedList', 'Vector'],
      correctIndex: 1,
      explanation: 'HashSet implements the Set interface, disallowing duplicate elements with average O(1) hash lookups.',
      difficulty: 'Beginner'
    },
    {
      id: 'java-4',
      skill: 'Java',
      question: 'What does JVM bytecode compilation enable in Java architecture?',
      options: ['Hardware-level binary execution without a runtime', '"Write Once, Run Anywhere" across platforms with a JVM', 'Direct memory pointers and manual garbage allocation', 'Single-threaded non-blocking event loops'],
      correctIndex: 1,
      explanation: 'Java source compiles into JVM bytecode, allowing cross-platform execution on any operating system supporting a JVM.',
      difficulty: 'Beginner'
    },
    {
      id: 'java-5',
      skill: 'Java',
      question: 'What happens when `str1 == str2` is executed on two distinct String objects with the same characters in Java?',
      options: ['Returns true always', 'Compares character values lexicographically', 'Compares memory reference addresses, returning false unless interned', 'Throws a NullPointerException'],
      correctIndex: 2,
      explanation: 'In Java, == tests reference equality (memory location), whereas .equals() compares string value content.',
      difficulty: 'Intermediate'
    }
  ],

  // 3. C
  'C': [
    {
      id: 'c-1',
      skill: 'C',
      question: 'Which function is used in C to allocate memory dynamically on the heap without zero-initialization?',
      options: ['calloc()', 'malloc()', 'realloc()', 'free()'],
      correctIndex: 1,
      explanation: 'malloc() allocates the specified number of bytes leaving memory uninitialized, unlike calloc() which zero-initializes.',
      difficulty: 'Beginner'
    },
    {
      id: 'c-2',
      skill: 'C',
      question: 'What does the expression `*ptr` represent when `ptr` is an `int*` pointer?',
      options: ['The memory address stored in ptr', 'The integer value stored at the address pointed to by ptr', 'The byte size of the pointer', 'A pointer to another pointer'],
      correctIndex: 1,
      explanation: 'The asterisk `*` dereferences the pointer, accessing the actual data value stored at that address.',
      difficulty: 'Beginner'
    },
    {
      id: 'c-3',
      skill: 'C',
      question: 'What is the output format specifier for a floating-point number in printf()?',
      options: ['%d', '%s', '%f', '%c'],
      correctIndex: 2,
      explanation: '%f is the format specifier for float / double numbers in C stdio.',
      difficulty: 'Beginner'
    },
    {
      id: 'c-4',
      skill: 'C',
      question: 'What causes a segmentation fault (SIGSEGV) in C programs?',
      options: ['Syntax compilation error in header files', 'Accessing memory that the program does not have permission to read or write', 'Integer overflow in arithmetic operations', 'Omitting the return statement in main()'],
      correctIndex: 1,
      explanation: 'A segmentation fault occurs when an application attempts to access restricted memory addresses (e.g. null pointer dereference).',
      difficulty: 'Intermediate'
    },
    {
      id: 'c-5',
      skill: 'C',
      question: 'What is the size of an `int` pointer on a standard 64-bit architecture?',
      options: ['2 bytes', '4 bytes', '8 bytes', '16 bytes'],
      correctIndex: 2,
      explanation: 'On a 64-bit architecture, all memory pointers are 8 bytes (64 bits) wide regardless of the data type they point to.',
      difficulty: 'Intermediate'
    }
  ],

  // 4. C++
  'C++': [
    {
      id: 'cpp-1',
      skill: 'C++',
      question: 'What is the primary role of a virtual destructor in a C++ base class?',
      options: ['To speed up object construction', 'To ensure derived class destructors are called when deleting through a base pointer', 'To prevent inheritance of private variables', 'To allocate memory in the static heap'],
      correctIndex: 1,
      explanation: 'A virtual destructor ensures that the proper derived class destructor is invoked upon deletion through a base class pointer.',
      difficulty: 'Intermediate'
    },
    {
      id: 'cpp-2',
      skill: 'C++',
      question: 'Which STL container stores elements contiguously in memory and supports amortized O(1) push_back?',
      options: ['std::list', 'std::set', 'std::vector', 'std::map'],
      correctIndex: 2,
      explanation: 'std::vector is a dynamic array storing items contiguously with O(1) random access and amortized O(1) appending.',
      difficulty: 'Beginner'
    },
    {
      id: 'cpp-3',
      skill: 'C++',
      question: 'What does the RAII idiom stand for in modern C++?',
      options: ['Run And Iterate Immediately', 'Resource Acquisition Is Initialization', 'Recursive Array Instruction Indexing', 'Runtime Allocation Interface Protocol'],
      correctIndex: 1,
      explanation: 'RAII binds resource lifecycle (memory, files, sockets) to object lifetime, ensuring automatic cleanup upon stack exit.',
      difficulty: 'Intermediate'
    },
    {
      id: 'cpp-4',
      skill: 'C++',
      question: 'Which smart pointer in modern C++ represents exclusive, non-copyable ownership of a heap resource?',
      options: ['std::shared_ptr', 'std::weak_ptr', 'std::unique_ptr', 'std::auto_ptr'],
      correctIndex: 2,
      explanation: 'std::unique_ptr uniquely owns a resource; it cannot be copied, only moved via std::move.',
      difficulty: 'Intermediate'
    },
    {
      id: 'cpp-5',
      skill: 'C++',
      question: 'What keyword enables compile-time type checking and function templating in C++?',
      options: ['template', 'typename', 'auto', 'virtual'],
      correctIndex: 0,
      explanation: '`template <typename T>` defines generic classes and functions evaluated at compile time.',
      difficulty: 'Beginner'
    }
  ],

  // 5. JavaScript
  'JavaScript': [
    {
      id: 'js-1',
      skill: 'JavaScript',
      question: 'What does `typeof null` evaluate to in JavaScript due to legacy implementation?',
      options: ['"null"', '"undefined"', '"object"', '"boolean"'],
      correctIndex: 2,
      explanation: 'In JavaScript, typeof null returns "object", which is a recognized historical design quirk of the engine.',
      difficulty: 'Beginner'
    },
    {
      id: 'js-2',
      skill: 'JavaScript',
      question: 'What is the key difference between `==` and `===` in JavaScript?',
      options: ['=== performs type coercion while == does not', '== checks both value and type, === checks only value', '=== checks both value and type without type coercion', 'There is no functional difference in modern ES6+'],
      correctIndex: 2,
      explanation: 'The strict equality operator `===` checks both value and type without performing implicit type coercion.',
      difficulty: 'Beginner'
    },
    {
      id: 'js-3',
      skill: 'JavaScript',
      question: 'What is a closure in JavaScript?',
      options: ['A method to close browser tabs asynchronously', 'A function combined with references to its surrounding lexical environment', 'An error thrown when a promise is unhandled', 'A loop termination statement'],
      correctIndex: 1,
      explanation: 'A closure is the combination of a function bundled together with references to its lexical scope, allowing access to outer variables even after the outer function has closed.',
      difficulty: 'Intermediate'
    },
    {
      id: 'js-4',
      skill: 'JavaScript',
      question: 'Which method returns a new array with all elements that pass a test implemented by the provided function?',
      options: ['map()', 'filter()', 'reduce()', 'forEach()'],
      correctIndex: 1,
      explanation: 'Array.prototype.filter() creates a shallow copy of an array filtered down to elements passing the condition.',
      difficulty: 'Beginner'
    },
    {
      id: 'js-5',
      skill: 'JavaScript',
      question: 'What is the role of the Event Loop in JavaScript runtime architecture?',
      options: ['To manage multi-core thread synchronization', 'To continuously check the call stack and dequeue asynchronous callbacks from the task queue', 'To compile JavaScript into machine code', 'To garbage collect unused variables'],
      correctIndex: 1,
      explanation: 'The event loop continuously monitors the call stack and pushes pending microtasks and macrotasks from queues onto the stack when it is empty.',
      difficulty: 'Intermediate'
    }
  ],

  // 6. SQL
  'SQL': [
    {
      id: 'sql-1',
      skill: 'SQL',
      question: 'Which SQL clause is used to filter records aggregated by a GROUP BY clause?',
      options: ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'],
      correctIndex: 1,
      explanation: 'WHERE filters rows before aggregation, while HAVING filters aggregated summary rows after GROUP BY.',
      difficulty: 'Beginner'
    },
    {
      id: 'sql-2',
      skill: 'SQL',
      question: 'What does a LEFT JOIN return between Table A and Table B?',
      options: ['Only matching rows from both tables', 'All rows from Table A, plus matching rows from Table B (with NULL for non-matches)', 'All rows from Table B, plus matching rows from Table A', 'Only rows that do not match in either table'],
      correctIndex: 1,
      explanation: 'A LEFT JOIN returns all records from the left table, and matching records from the right table or NULL.',
      difficulty: 'Beginner'
    },
    {
      id: 'sql-3',
      skill: 'SQL',
      question: 'Which window function assigns a sequential unique integer to rows within a partition without gaps?',
      options: ['RANK()', 'DENSE_RANK()', 'ROW_NUMBER()', 'LEAD()'],
      correctIndex: 2,
      explanation: 'ROW_NUMBER() always assigns sequential unique numbers (1, 2, 3...) regardless of ties.',
      difficulty: 'Intermediate'
    },
    {
      id: 'sql-4',
      skill: 'SQL',
      question: 'What does the ACID acronym stand for in relational database transactions?',
      options: ['Atomicity, Consistency, Isolation, Durability', 'Accuracy, Concurrency, Integrity, Delivery', 'Authentication, Compression, Indexing, Decryption', 'Aggregation, Clustering, Iteration, Deletion'],
      correctIndex: 0,
      explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability, the core guarantees of database transactions.',
      difficulty: 'Intermediate'
    },
    {
      id: 'sql-5',
      skill: 'SQL',
      question: 'What is the primary benefit of adding a B-Tree index to a frequently queried database column?',
      options: ['Decreases write speed and saves disk space', 'Reduces table scan complexity from O(N) to O(log N) for lookups', 'Automatically normalizes the table to 3NF', 'Enforces foreign key referential integrity'],
      correctIndex: 1,
      explanation: 'Indices provide logarithmic lookup time for WHERE, JOIN, and ORDER BY clauses instead of full table scans.',
      difficulty: 'Intermediate'
    }
  ],

  // 7. Statistics
  'Statistics': [
    {
      id: 'stat-1',
      skill: 'Statistics',
      question: 'In a standard normal distribution, approximately what percentage of observations fall within ±1 standard deviation of the mean?',
      options: ['50%', '68%', '95%', '99.7%'],
      correctIndex: 1,
      explanation: 'According to the Empirical Rule (68-95-99.7 rule), approximately 68% of data falls within 1 standard deviation.',
      difficulty: 'Beginner'
    },
    {
      id: 'stat-2',
      skill: 'Statistics',
      question: 'What is a Type I error in statistical hypothesis testing?',
      options: ['Failing to reject a false null hypothesis (False Negative)', 'Rejecting a true null hypothesis (False Positive)', 'Using a sample size that is too small', 'A calculation error in variance'],
      correctIndex: 1,
      explanation: 'A Type I error occurs when the null hypothesis is actually true, but is incorrectly rejected (False Positive).',
      difficulty: 'Intermediate'
    },
    {
      id: 'stat-3',
      skill: 'Statistics',
      question: 'Which measure of central tendency is least sensitive to extreme outliers in skewed data?',
      options: ['Mean', 'Median', 'Variance', 'Standard Deviation'],
      correctIndex: 1,
      explanation: 'The median represents the 50th percentile and is robust against extreme values, unlike the arithmetic mean.',
      difficulty: 'Beginner'
    },
    {
      id: 'stat-4',
      skill: 'Statistics',
      question: 'What does a p-value less than 0.05 typically indicate in hypothesis testing?',
      options: ['The null hypothesis is 100% proven false', 'The observed effect is statistically significant under the conventional threshold', 'The alternative hypothesis has a 95% probability of error', 'The sample size is insufficient'],
      correctIndex: 1,
      explanation: 'A p-value < 0.05 indicates that the observed test statistic has less than a 5% likelihood of occurring by chance under the null hypothesis.',
      difficulty: 'Beginner'
    },
    {
      id: 'stat-5',
      skill: 'Statistics',
      question: 'What theorem states that the sample mean distribution approaches normality as sample size increases, regardless of population shape?',
      options: ['Bayes’ Theorem', 'Central Limit Theorem', 'Law of Total Probability', 'Chebyshev’s Inequality'],
      correctIndex: 1,
      explanation: 'The Central Limit Theorem (CLT) guarantees that sample means will be approximately normally distributed for sufficiently large N.',
      difficulty: 'Intermediate'
    }
  ],

  // 8. Pandas
  'Pandas': [
    {
      id: 'pd-1',
      skill: 'Pandas',
      question: 'Which Pandas method is used to inspect summary statistics (mean, count, std, quartiles) of numerical columns?',
      options: ['df.info()', 'df.describe()', 'df.head()', 'df.shape'],
      correctIndex: 1,
      explanation: 'df.describe() generates descriptive summary statistics including count, mean, standard deviation, and quartiles.',
      difficulty: 'Beginner'
    },
    {
      id: 'pd-2',
      skill: 'Pandas',
      question: 'What is the primary difference between `df.loc[]` and `df.iloc[]` in Pandas?',
      options: ['loc uses labels/names, while iloc uses integer positions', 'iloc is for columns only, loc is for rows only', 'loc is deprecated in modern Pandas 2.0', 'iloc performs SQL joins, loc performs filters'],
      correctIndex: 0,
      explanation: 'df.loc is label-based indexing, whereas df.iloc is integer position-based indexing.',
      difficulty: 'Beginner'
    },
    {
      id: 'pd-3',
      skill: 'Pandas',
      question: 'How do you check for and drop duplicate rows in a DataFrame `df`?',
      options: ['df.remove_duplicates()', 'df.drop_duplicates()', 'df.unique()', 'df.distinct()'],
      correctIndex: 1,
      explanation: 'df.drop_duplicates() returns a DataFrame with duplicate rows removed.',
      difficulty: 'Beginner'
    },
    {
      id: 'pd-4',
      skill: 'Pandas',
      question: 'Which method is used to handle missing NaN values by substituting them with a specified value?',
      options: ['df.dropna()', 'df.fillna()', 'df.replace_null()', 'df.interpolate_only()'],
      correctIndex: 1,
      explanation: 'df.fillna(value) fills NA/NaN values using the specified method or constant.',
      difficulty: 'Beginner'
    },
    {
      id: 'pd-5',
      skill: 'Pandas',
      question: 'What does `df.groupby("category")["sales"].agg(["mean", "sum"])` produce?',
      options: ['A filtered DataFrame containing only rows with maximum sales', 'A multi-metric aggregated summary showing both average and total sales per category', 'A merged SQL table on category keys', 'A time-series resampled DataFrame'],
      correctIndex: 1,
      explanation: 'The agg() function applies multiple aggregation functions (mean and sum) to the grouped subsets.',
      difficulty: 'Intermediate'
    }
  ],

  // 9. NumPy
  'NumPy': [
    {
      id: 'np-1',
      skill: 'NumPy',
      question: 'How do you create a 3x3 array containing all ones in NumPy?',
      options: ['np.ones((3, 3))', 'np.identity(3, 1)', 'np.full(3, 1)', 'np.create_matrix(1, 3, 3)'],
      correctIndex: 0,
      explanation: 'np.ones((rows, cols)) initializes a new array of given shape filled with ones.',
      difficulty: 'Beginner'
    },
    {
      id: 'np-2',
      skill: 'NumPy',
      question: 'What is "broadcasting" in NumPy operations?',
      options: ['Streaming array data over network sockets', 'The ability of NumPy to perform element-wise arithmetic on arrays with compatible but different shapes', 'Parallel GPU multi-processing', 'Converting multi-dimensional arrays to 1D strings'],
      correctIndex: 1,
      explanation: 'Broadcasting describes how NumPy treats arrays with different shapes during arithmetic operations without copying data.',
      difficulty: 'Intermediate'
    },
    {
      id: 'np-3',
      skill: 'NumPy',
      question: 'Which operation computes the matrix dot product between two 2D arrays A and B in modern Python/NumPy?',
      options: ['A * B', 'A @ B', 'A.cross(B)', 'np.concat(A, B)'],
      correctIndex: 1,
      explanation: 'The `@` operator (or np.dot(A, B)) performs matrix multiplication, whereas `*` performs element-wise multiplication.',
      difficulty: 'Beginner'
    },
    {
      id: 'np-4',
      skill: 'NumPy',
      question: 'What is the attribute to check the dimensions (e.g. rows, columns) of a NumPy array?',
      options: ['arr.dimension', 'arr.shape', 'arr.size', 'arr.len'],
      correctIndex: 1,
      explanation: 'arr.shape returns a tuple of integers indicating the size of the array along each axis.',
      difficulty: 'Beginner'
    },
    {
      id: 'np-5',
      skill: 'NumPy',
      question: 'What is the difference between `np.reshape()` and `np.ravel()`?',
      options: ['reshape alters dimensions to a target shape; ravel flattens into a 1D view', 'ravel duplicates memory while reshape frees it', 'reshape only works on 1D arrays', 'There is no difference'],
      correctIndex: 0,
      explanation: 'reshape gives a new shape to an array, while ravel flattens a multi-dimensional array into a contiguous 1D array.',
      difficulty: 'Intermediate'
    }
  ],

  // 10. Data Visualization
  'Data Visualization': [
    {
      id: 'dv-1',
      skill: 'Data Visualization',
      question: 'Which chart type is best suited to display the distribution and quartile skewness of a continuous variable?',
      options: ['Pie Chart', 'Box Plot (Whisker Plot)', 'Scatter Plot', 'Donut Chart'],
      correctIndex: 1,
      explanation: 'Box plots display the minimum, first quartile, median, third quartile, maximum, and potential outliers.',
      difficulty: 'Beginner'
    },
    {
      id: 'dv-2',
      skill: 'Data Visualization',
      question: 'Which Python library is built on top of Matplotlib and provides a high-level statistical interface with attractive defaults?',
      options: ['Seaborn', 'OpenCV', 'PyTorch', 'BeautifulSoup'],
      correctIndex: 0,
      explanation: 'Seaborn provides high-level abstractions for statistical charts with built-in color themes and DataFrame integration.',
      difficulty: 'Beginner'
    },
    {
      id: 'dv-3',
      skill: 'Data Visualization',
      question: 'What visualization is best suited to analyze the correlation between two continuous variables?',
      options: ['Scatter Plot', 'Bar Chart', 'Stacked Area Chart', 'Pie Chart'],
      correctIndex: 0,
      explanation: 'Scatter plots plot values of two variables along Cartesian coordinates to reveal trends and correlations.',
      difficulty: 'Beginner'
    },
    {
      id: 'dv-4',
      skill: 'Data Visualization',
      question: 'Why are pie charts generally discouraged for comparing more than 5 categories in data communication?',
      options: ['They take too much GPU memory to render', 'Human visual perception struggles to accurately distinguish small differences in 2D angle and area', 'They cannot be exported to SVG format', 'They require 3D modeling libraries'],
      correctIndex: 1,
      explanation: 'Humans assess linear lengths and heights far more accurately than slice angles and circular areas.',
      difficulty: 'Intermediate'
    },
    {
      id: 'dv-5',
      skill: 'Data Visualization',
      question: 'What is a Heatmap primarily used to represent in exploratory data analysis?',
      options: ['Geographical elevation only', 'A 2D matrix where individual values are represented by color gradients, such as correlation matrices', 'Server temperature metrics over time', 'Network latency graphs'],
      correctIndex: 1,
      explanation: 'Heatmaps represent matrix values via color intensity, making cross-correlation between features instantly visible.',
      difficulty: 'Intermediate'
    }
  ],

  // 11. Machine Learning
  'Machine Learning': [
    {
      id: 'ml-1',
      skill: 'Machine Learning',
      question: 'What is the fundamental difference between Supervised and Unsupervised learning?',
      options: ['Supervised uses labeled training data; unsupervised learns patterns from unlabeled data', 'Supervised requires neural networks; unsupervised uses decision trees', 'Supervised cannot do classification', 'Unsupervised models never have errors'],
      correctIndex: 0,
      explanation: 'Supervised learning trains on input-output label pairs, whereas unsupervised discovers latent clusters or structure without labels.',
      difficulty: 'Beginner'
    },
    {
      id: 'ml-2',
      skill: 'Machine Learning',
      question: 'What problem occurs when a model performs exceptionally on training data but poorly on unseen test data?',
      options: ['Underfitting (High Bias)', 'Overfitting (High Variance)', 'Data Leakage', 'Vanishing Gradient'],
      correctIndex: 1,
      explanation: 'Overfitting occurs when a model memorizes noise in the training set and fails to generalize to unseen test data.',
      difficulty: 'Beginner'
    },
    {
      id: 'ml-3',
      skill: 'Machine Learning',
      question: 'Which metric is most appropriate for evaluating a classifier on a heavily imbalanced dataset (e.g. 99% negative, 1% fraud)?',
      options: ['Raw Accuracy', 'Precision, Recall, and F1-Score / PR-AUC', 'Mean Squared Error', 'R-Squared Score'],
      correctIndex: 1,
      explanation: 'Raw accuracy is misleading on imbalanced sets (a naive model predicting all negatives gets 99% accuracy). Precision, Recall, and F1 evaluate the minority class.',
      difficulty: 'Intermediate'
    },
    {
      id: 'ml-4',
      skill: 'Machine Learning',
      question: 'What is the purpose of K-Fold Cross Validation?',
      options: ['To generate synthetic training data', 'To reliably estimate model generalization error by partitioning data into K subsets and validating across all folds', 'To speed up model inference latency', 'To compress model weights for edge deployment'],
      correctIndex: 1,
      explanation: 'K-fold cross validation reduces variance in evaluation metrics by rotating training and validation splits K times.',
      difficulty: 'Intermediate'
    },
    {
      id: 'ml-5',
      skill: 'Machine Learning',
      question: 'What ensemble technique combines multiple weak base learners sequentially, where each new learner corrects errors made by previous ones?',
      options: ['Bagging (e.g. Random Forest)', 'Boosting (e.g. Gradient Boosting, XGBoost)', 'Strap Sampling', 'Dimensionality Reduction (PCA)'],
      correctIndex: 1,
      explanation: 'Boosting trains estimators sequentially, prioritizing weights of misclassified instances from previous iterations.',
      difficulty: 'Intermediate'
    }
  ],

  // 12. Deep Learning
  'Deep Learning': [
    {
      id: 'dl-1',
      skill: 'Deep Learning',
      question: 'What is the primary role of an Activation Function (like ReLU or Sigmoid) in neural network layers?',
      options: ['To speed up hard drive data loading', 'To introduce non-linearity, allowing the network to learn complex non-linear patterns', 'To normalize database column names', 'To prevent memory leaks in C++ libraries'],
      correctIndex: 1,
      explanation: 'Without non-linear activation functions, a multi-layer neural network collapses into a single linear regression model.',
      difficulty: 'Beginner'
    },
    {
      id: 'dl-2',
      skill: 'Deep Learning',
      question: 'What algorithm is used to calculate gradients of the loss function with respect to weights using the chain rule of calculus?',
      options: ['Backpropagation', 'Principal Component Analysis', 'K-Means Clustering', 'A* Search'],
      correctIndex: 0,
      explanation: 'Backpropagation computes the gradient of the loss with respect to each weight via the chain rule, enabling gradient descent updates.',
      difficulty: 'Intermediate'
    },
    {
      id: 'dl-3',
      skill: 'Deep Learning',
      question: 'Which neural network architecture is traditionally best suited for image and spatial pattern processing?',
      options: ['Recurrent Neural Networks (RNN)', 'Convolutional Neural Networks (CNN)', 'Multilayer Perceptron only', 'Hidden Markov Model'],
      correctIndex: 1,
      explanation: 'CNNs leverage shared convolutional filters and pooling layers to detect spatial hierarchies in image data.',
      difficulty: 'Beginner'
    },
    {
      id: 'dl-4',
      skill: 'Deep Learning',
      question: 'What technique temporarily deactivates a random subset of neurons during training to prevent co-adaptation and overfitting?',
      options: ['Batch Normalization', 'Dropout', 'Gradient Clipping', 'Early Stopping'],
      correctIndex: 1,
      explanation: 'Dropout sets random neuron activations to zero during forward passes, forcing redundant, robust feature representations.',
      difficulty: 'Intermediate'
    },
    {
      id: 'dl-5',
      skill: 'Deep Learning',
      question: 'What issue causes gradients in deep networks to become exponentially small during backpropagation, stopping earlier layers from learning?',
      options: ['Exploding Gradients', 'Vanishing Gradient Problem', 'Dead Neurons', 'Covariate Shift'],
      correctIndex: 1,
      explanation: 'The vanishing gradient problem occurs when repeated multiplication of small derivatives (e.g. Sigmoid) diminishes gradients to near zero.',
      difficulty: 'Intermediate'
    }
  ],

  // 13. Neural Networks
  'Neural Networks': [
    {
      id: 'nn-1',
      skill: 'Neural Networks',
      question: 'What mathematical components constitute a single artificial neuron (perceptron)?',
      options: ['Inputs, weights, bias, and an activation function', 'Pointers, memory addresses, and CPU threads', 'Relational keys, indices, and foreign constraints', 'Audio frequency, amplitude, and sampling rate'],
      correctIndex: 0,
      explanation: 'A perceptron computes a weighted sum of inputs plus a bias: z = sum(w_i * x_i) + b, followed by an activation function a = f(z).',
      difficulty: 'Beginner'
    },
    {
      id: 'nn-2',
      skill: 'Neural Networks',
      question: 'What does the Learning Rate parameter control in Stochastic Gradient Descent (SGD)?',
      options: ['The batch size of the dataset', 'The step size taken in the direction of the negative gradient towards minimal loss', 'The number of hidden layers in the network', 'The hardware clock speed of the GPU'],
      correctIndex: 1,
      explanation: 'The learning rate scales the magnitude of parameter updates at each optimization step.',
      difficulty: 'Beginner'
    },
    {
      id: 'nn-3',
      skill: 'Neural Networks',
      question: 'Which loss function is standard for multi-class classification problems with one-hot encoded targets?',
      options: ['Mean Squared Error (MSE)', 'Categorical Cross-Entropy', 'Binary Cross-Entropy', 'Hinge Loss'],
      correctIndex: 1,
      explanation: 'Categorical cross-entropy measures the divergence between predicted probability distributions (softmax) and true one-hot targets.',
      difficulty: 'Intermediate'
    },
    {
      id: 'nn-4',
      skill: 'Neural Networks',
      question: 'What is the role of an Epoch in neural network training?',
      options: ['A single forward pass of one training sample', 'One complete pass through the entire training dataset', 'The total time in seconds the model trains', 'The validation checkpoint interval'],
      correctIndex: 1,
      explanation: 'An epoch represents one full iteration through all mini-batches of the training dataset.',
      difficulty: 'Beginner'
    },
    {
      id: 'nn-5',
      skill: 'Neural Networks',
      question: 'What optimization technique normalizes layer inputs across a mini-batch to stabilize training and accelerate convergence?',
      options: ['Batch Normalization', 'Weight Decay', 'Learning Rate Scheduling', 'Stochastic Pruning'],
      correctIndex: 0,
      explanation: 'Batch normalization standardizes layer inputs to zero mean and unit variance across each mini-batch, smoothing the optimization landscape.',
      difficulty: 'Intermediate'
    }
  ],

  // 14. Natural Language Processing (NLP)
  'Natural Language Processing': [
    {
      id: 'nlp-1',
      skill: 'Natural Language Processing',
      question: 'What is the process of breaking raw text into individual words, phrases, or symbols called?',
      options: ['Stemming', 'Lemmatization', 'Tokenization', 'Vectorization'],
      correctIndex: 2,
      explanation: 'Tokenization splits continuous text strings into discrete units (tokens) suitable for language processing.',
      difficulty: 'Beginner'
    },
    {
      id: 'nlp-2',
      skill: 'Natural Language Processing',
      question: 'What distinguishes Lemmatization from Stemming in NLP preprocessing?',
      options: ['Stemming uses dictionary vocabulary; lemmatization chops off word ends heuristically', 'Lemmatization uses morphological analysis and dictionary lookups to return valid root words (lemmas)', 'There is no difference', 'Lemmatization only works on numbers'],
      correctIndex: 1,
      explanation: 'Lemmatization considers context and vocabulary to reduce words to their canonical dictionary form (e.g. "better" -> "good"), whereas stemming strips affixes crudely (e.g. "studies" -> "studi").',
      difficulty: 'Intermediate'
    },
    {
      id: 'nlp-3',
      skill: 'Natural Language Processing',
      question: 'What does TF-IDF stand for in text feature representation?',
      options: ['Text Format In Data Files', 'Term Frequency - Inverse Document Frequency', 'Token Filter - Iterative Dictionary Function', 'Training Frequency - Inference Distribution Factor'],
      correctIndex: 1,
      explanation: 'TF-IDF evaluates how important a word is to a document relative to an entire corpus by penalizing ubiquitous words.',
      difficulty: 'Beginner'
    },
    {
      id: 'nlp-4',
      skill: 'Natural Language Processing',
      question: 'What revolutionary neural mechanism introduced in the paper "Attention Is All You Need" (2017) powers Transformers?',
      options: ['Self-Attention Mechanism', 'Recurrent Convolution', 'Markov State Chains', 'Backtracking Search'],
      correctIndex: 0,
      explanation: 'The self-attention mechanism enables models to weigh the contextual importance of all words in a sequence simultaneously without sequential recurrence.',
      difficulty: 'Intermediate'
    },
    {
      id: 'nlp-5',
      skill: 'Natural Language Processing',
      question: 'What NLP task identifies and classifies mentions of persons, organizations, locations, and dates in unstructured text?',
      options: ['Named Entity Recognition (NER)', 'Sentiment Analysis', 'Part-of-Speech Tagging', 'Topic Modeling'],
      correctIndex: 0,
      explanation: 'Named Entity Recognition (NER) extracts key entities like organizations, people, locations, and skills from raw text.',
      difficulty: 'Beginner'
    }
  ],

  // 15. Generative AI
  'Generative AI': [
    {
      id: 'genai-1',
      skill: 'Generative AI',
      question: 'What does the term "Hallucination" refer to in Large Language Model (LLM) behavior?',
      options: ['When an LLM crashes due to lack of RAM', 'When an LLM generates plausible-sounding but factually incorrect or fabricated information', 'When an LLM translates text between multiple languages', 'When an LLM generates images from text prompts'],
      correctIndex: 1,
      explanation: 'Hallucination occurs when an LLM produces confident, syntactically coherent statements that lack factual basis.',
      difficulty: 'Beginner'
    },
    {
      id: 'genai-2',
      skill: 'Generative AI',
      question: 'What is RAG (Retrieval-Augmented Generation) in modern AI engineering?',
      options: ['A compression algorithm for LLM weights', 'An architecture that fetches relevant documents from an external knowledge base and passes them into the LLM prompt context', 'A reinforcement learning algorithm based on human feedback', 'A robotic arm simulation toolkit'],
      correctIndex: 1,
      explanation: 'RAG augments LLMs with factual up-to-date domain data by querying a vector database and injecting relevant chunks into the prompt.',
      difficulty: 'Intermediate'
    },
    {
      id: 'genai-3',
      skill: 'Generative AI',
      question: 'What parameter controls the randomness and creativity of generated tokens in an LLM API call?',
      options: ['Batch Size', 'Temperature', 'Epoch Count', 'Dropout Rate'],
      correctIndex: 1,
      explanation: 'Temperature scales output logits: lower temperature (e.g. 0.1) produces deterministic output, higher temperature (e.g. 0.8) yields more diverse responses.',
      difficulty: 'Beginner'
    },
    {
      id: 'genai-4',
      skill: 'Generative AI',
      question: 'What technique allows fine-tuning large foundation models with minimal compute by freezing original weights and training low-rank decomposition matrices?',
      options: ['Full Pretraining', 'LoRA (Low-Rank Adaptation)', 'Quantization Only', 'Grid Search'],
      correctIndex: 1,
      explanation: 'LoRA freezes pretrained model weights and injects trainable rank decomposition matrices into Transformer attention layers, drastically reducing VRAM requirements.',
      difficulty: 'Intermediate'
    },
    {
      id: 'genai-5',
      skill: 'Generative AI',
      question: 'What metric is used by vector databases to measure similarity between high-dimensional embedding vectors?',
      options: ['Cosine Similarity or Dot Product Distance', 'Levenshtein Edit Distance', 'Hamming Code Sum', 'Bubble Sort Swaps'],
      correctIndex: 0,
      explanation: 'Vector databases use Cosine Similarity, Euclidean Distance (L2), or Dot Product to compare embedding orientation in semantic space.',
      difficulty: 'Intermediate'
    }
  ],

  // 16. Excel
  'Excel': [
    {
      id: 'excel-1',
      skill: 'Excel',
      question: 'Which modern Excel function replaces both VLOOKUP and HLOOKUP with bidirectional search capabilities?',
      options: ['LOOKUP2()', 'XLOOKUP()', 'INDEX()', 'MATCH_EX()'],
      correctIndex: 1,
      explanation: 'XLOOKUP looks up a value in an array and returns corresponding items from another array in any direction.',
      difficulty: 'Beginner'
    },
    {
      id: 'excel-2',
      skill: 'Excel',
      question: 'What feature in Excel allows you to quickly summarize, reorganize, aggregate, and analyze large datasets without writing formulas?',
      options: ['PivotTables', 'Goal Seek', 'Data Validation', 'Solver'],
      correctIndex: 0,
      explanation: 'PivotTables enable rapid multidimensional cross-tabulation, aggregation, and grouping of raw spreadsheet tables.',
      difficulty: 'Beginner'
    },
    {
      id: 'excel-3',
      skill: 'Excel',
      question: 'What does the dollar sign `$` signify in an Excel cell reference like `$A$1`?',
      options: ['Currency formatting for financial amounts', 'Absolute reference locking both the column and row from changing when copied', 'A reference to an external workbook', 'An encrypted cell value'],
      correctIndex: 1,
      explanation: 'The `$` locks the row or column reference so it does not adjust when formulas are dragged or copied to other cells.',
      difficulty: 'Beginner'
    },
    {
      id: 'excel-4',
      skill: 'Excel',
      question: 'Which Excel tool is used to find the specific input value needed to achieve a target formula result (e.g. target profit)?',
      options: ['Scenario Manager', 'Goal Seek', 'Conditional Formatting', 'Flash Fill'],
      correctIndex: 1,
      explanation: 'Goal Seek is a What-If analysis tool that calculates the input value necessary to achieve a specific target goal.',
      difficulty: 'Intermediate'
    },
    {
      id: 'excel-5',
      skill: 'Excel',
      question: 'What formula correctly sums values in range C1:C20 only if corresponding cells in B1:B20 equal "Completed"?',
      options: ['=SUMIF(B1:B20, "Completed", C1:C20)', '=SUM(IF(B1:B20 = "Completed", C1:C20))', '=COUNTIF(B1:B20, "Completed")', '=VLOOKUP("Completed", B1:C20, 2, FALSE)'],
      correctIndex: 0,
      explanation: '=SUMIF(range, criteria, [sum_range]) adds cells specified by a condition.',
      difficulty: 'Intermediate'
    }
  ],

  // 17. Power BI
  'Power BI': [
    {
      id: 'pbi-1',
      skill: 'Power BI',
      question: 'What formula language is used in Power BI to create custom calculated columns, measures, and data models?',
      options: ['VBA', 'DAX (Data Analysis Expressions)', 'M Code (Power Query only)', 'Python script only'],
      correctIndex: 1,
      explanation: 'DAX (Data Analysis Expressions) is the formula language used in Power BI and Analysis Services for analytical calculations.',
      difficulty: 'Beginner'
    },
    {
      id: 'pbi-2',
      skill: 'Power BI',
      question: 'Which component of Power BI is responsible for data extraction, transformation, cleansing, and loading (ETL)?',
      options: ['Power View', 'Power Query Editor', 'Power Map', 'DAX Studio'],
      correctIndex: 1,
      explanation: 'Power Query Editor allows users to connect to disparate data sources, shape, clean, and transform tables using M code.',
      difficulty: 'Beginner'
    },
    {
      id: 'pbi-3',
      skill: 'Power BI',
      question: 'What schema design is recommended as best practice for Power BI analytical data modeling?',
      options: ['Flat Single-Table Schema', 'Star Schema (Fact tables linked to Dimension tables)', 'Normalized 5NF relational schema', 'Hierarchical network graph'],
      correctIndex: 1,
      explanation: 'A Star Schema (central Fact table with surrounding Dimension tables) is the industry gold standard for Power BI performance.',
      difficulty: 'Intermediate'
    },
    {
      id: 'pbi-4',
      skill: 'Power BI',
      question: 'What is the primary difference between a Calculated Column and a Measure in Power BI?',
      options: ['Calculated columns are computed row-by-row during refresh and take RAM; Measures are evaluated dynamically at query time based on filter context', 'Measures take up hard disk storage while columns do not', 'Measures cannot be used in visual charts', 'Calculated columns are written in SQL'],
      correctIndex: 0,
      explanation: 'Calculated columns store values in tables per row consuming memory; Measures calculate on the fly responding to visual slicers and filter context.',
      difficulty: 'Intermediate'
    },
    {
      id: 'pbi-5',
      skill: 'Power BI',
      question: 'Which DAX function overrides or alters the active filter context in a calculation?',
      options: ['SUM()', 'CALCULATE()', 'RELATED()', 'FILTER_TABLE()'],
      correctIndex: 1,
      explanation: 'CALCULATE(expression, filter1, ...) is the most powerful DAX function, evaluating an expression under modified filter contexts.',
      difficulty: 'Intermediate'
    }
  ],

  // 18. HTML
  'HTML': [
    {
      id: 'html-1',
      skill: 'HTML',
      question: 'Which HTML5 semantic element is most appropriate for containing the primary navigation links of a website?',
      options: ['<section>', '<nav>', '<header>', '<aside>'],
      correctIndex: 1,
      explanation: 'The <nav> semantic tag designates a section of a page intended for navigation links.',
      difficulty: 'Beginner'
    },
    {
      id: 'html-2',
      skill: 'HTML',
      question: 'What is the purpose of the `alt` attribute on an `<img>` tag in HTML?',
      options: ['Specifies alternate high-resolution image URLs', 'Provides alternative text for screen readers and when images fail to render', 'Sets the alignment of the image on the page', 'Animates the image during hover events'],
      correctIndex: 1,
      explanation: 'The alt attribute provides accessible text descriptions for screen readers and displays when image loading fails.',
      difficulty: 'Beginner'
    },
    {
      id: 'html-3',
      skill: 'HTML',
      question: 'Which attribute ensures that an input field must be filled out before submitting an HTML form?',
      options: ['validate="true"', 'required', 'mandatory', 'checked'],
      correctIndex: 1,
      explanation: 'The boolean `required` attribute specifies that an input field must contain a value prior to form submission.',
      difficulty: 'Beginner'
    },
    {
      id: 'html-4',
      skill: 'HTML',
      question: 'What does the `<meta name="viewport" content="width=device-width, initial-scale=1.0">` tag configure?',
      options: ['Page title and SEO keywords', 'Responsive mobile layout scaling matching device screen width', 'Website cookie consent policy', 'Cross-origin resource sharing (CORS)'],
      correctIndex: 1,
      explanation: 'The viewport meta tag instructs browsers to control the page dimensions and scaling to suit diverse screen sizes.',
      difficulty: 'Intermediate'
    },
    {
      id: 'html-5',
      skill: 'HTML',
      question: 'What is the difference between a `<div>` and a `<span>` element in default browser flow?',
      options: ['div is a block-level element taking full width; span is an inline element taking only necessary width', 'div is deprecated in HTML5', 'span can contain headings while div cannot', 'div has no CSS styling capabilities'],
      correctIndex: 0,
      explanation: '<div> creates a block container with line breaks, whereas <span> wraps inline text without line breaks.',
      difficulty: 'Beginner'
    }
  ],

  // 19. CSS
  'CSS': [
    {
      id: 'css-1',
      skill: 'CSS',
      question: 'Which CSS layout model is designed for 1-dimensional layout distribution along a row or column?',
      options: ['CSS Grid', 'Flexbox', 'Table Layout', 'Absolute Positioning'],
      correctIndex: 1,
      explanation: 'Flexbox (Flexible Box Layout) is designed for 1-dimensional layouts (row or column), while CSS Grid handles 2D matrices.',
      difficulty: 'Beginner'
    },
    {
      id: 'css-2',
      skill: 'CSS',
      question: 'What does the CSS Box Model consist of, from innermost to outermost?',
      options: ['Content, Padding, Border, Margin', 'Content, Margin, Border, Padding', 'Border, Content, Padding, Margin', 'Padding, Border, Content, Margin'],
      correctIndex: 0,
      explanation: 'From the inside out: Content -> Padding -> Border -> Margin.',
      difficulty: 'Beginner'
    },
    {
      id: 'css-3',
      skill: 'CSS',
      question: 'What does `box-sizing: border-box;` accomplish in CSS layout styling?',
      options: ['Removes all margins from child elements', 'Includes padding and border within the specified element width and height', 'Adds a shadow around the element border', 'Forces the element to render as an inline block'],
      correctIndex: 1,
      explanation: 'border-box includes padding and border within the declared width/height, preventing layouts from breaking unexpectedly.',
      difficulty: 'Intermediate'
    },
    {
      id: 'css-4',
      skill: 'CSS',
      question: 'Which CSS unit is relative to the font-size of the root `<html>` element?',
      options: ['em', 'rem', 'px', 'vh'],
      correctIndex: 1,
      explanation: '`rem` (root em) is relative to the root <html> font-size, providing consistent scaling for responsive typography.',
      difficulty: 'Beginner'
    },
    {
      id: 'css-5',
      skill: 'CSS',
      question: 'What CSS rule allows applying different styles depending on screen width and device orientation?',
      options: ['@keyframes', '@media query', '@import', '@font-face'],
      correctIndex: 1,
      explanation: '@media queries allow responsive design by checking conditions such as min-width, max-width, or orientation.',
      difficulty: 'Beginner'
    }
  ],

  // 20. React
  'React': [
    {
      id: 'react-1',
      skill: 'React',
      question: 'Which hook is used in modern React functional components to manage local component state?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      correctIndex: 1,
      explanation: 'useState declares a state variable and a setter function in React functional components.',
      difficulty: 'Beginner'
    },
    {
      id: 'react-2',
      skill: 'React',
      question: 'What is the purpose of passing an empty dependency array `[]` to `useEffect()` in React?',
      options: ['The effect never runs', 'The effect runs only once after the initial component mount', 'The effect runs on every single render cycle', 'The effect causes an infinite loop'],
      correctIndex: 1,
      explanation: 'An empty dependency array tells React that the effect does not depend on any props or state, running it only once upon mount.',
      difficulty: 'Beginner'
    },
    {
      id: 'react-3',
      skill: 'React',
      question: 'Why should unique `key` props be provided when rendering lists of elements in React?',
      options: ['To give CSS unique styling IDs', 'To help React identify which items have changed, been added, or been removed during reconciliation', 'To encrypt list items in the DOM', 'To enable drag-and-drop mechanics automatically'],
      correctIndex: 1,
      explanation: 'Keys provide a stable identity to list items, allowing the Virtual DOM reconciliation algorithm to reuse DOM nodes efficiently.',
      difficulty: 'Intermediate'
    },
    {
      id: 'react-4',
      skill: 'React',
      question: 'What hook is used to access values from a React Context without wrapping with a Context.Consumer component?',
      options: ['useContext', 'useRef', 'useCallback', 'useMemo'],
      correctIndex: 0,
      explanation: 'useContext(MyContext) accepts a context object and returns the current context value provided by the nearest Provider.',
      difficulty: 'Beginner'
    },
    {
      id: 'react-5',
      skill: 'React',
      question: 'What is the primary benefit of `useMemo()` in performance optimization?',
      options: ['Caches a memoized calculation value between renders so expensive computations are not re-executed unless dependencies change', 'Stores values in the browser localStorage automatically', 'Prevents component unmounting', 'Automatically debounces form inputs'],
      correctIndex: 0,
      explanation: 'useMemo returns a memoized value, recalculating it only when one of its specified dependencies has changed.',
      difficulty: 'Intermediate'
    }
  ]
};
