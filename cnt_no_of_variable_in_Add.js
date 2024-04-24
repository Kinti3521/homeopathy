/**
 * * Q Write a c program to add two real numbers with three variables including some comment lines in the program. Save the program as Add.c. Now read the program Add.c and display the count of the number of variables as a valid identifier. Count the number of comment lines in the code. and the number of statements in the program Add.c
 **/

/*
───────┬───────────────────────────────────────────────────────────────────────────────────────────────
       │ File: Add.c
───────┼───────────────────────────────────────────────────────────────────────────────────────────────
   1   │ #include <stdio.h>
   2   │ 
   3   │ int main() {
   4   │   // declare 3 variables
   5   │   int num1, num2, sum;
   6   │   
   7   │   printf("Enter two numbers: "); // say user to add input
   8   │   scanf("%d %d", &num1, &num2); // read input from user
   9   │ 
  10   │   sum = num1 + num2; // add two numbers
  11   │   printf("Sum: %d\n", sum); // print the sum
  12   │ 
  13   │   return 0;
  14   │ }
───────┴───────────────────────────────────────────────────────────────────────────────────────────────
*/

const filePath = "./Add.c";
const fs = require("fs");

// read the file
const data = fs.readFileSync(filePath).toString();

// function to get the number of variables as a valid identifier
const getIdentifiers = (code) => {
  // regex to match the variables before int
  let regex = /(\bint\s+(?:\w+\s*,?\s*)+\b);/g;
  let match;
  const variablesBeforeInt = [];
  // loop through the matches and push the variables to the array
  while ((match = regex.exec(code)) !== null) {
    // if there are multiple variables, split them and push to the array
    if (match[1].split(",").length > 1) {
      variablesBeforeInt.push(...match[1].split(","));
    } else variablesBeforeInt.push(match[1]);
  }
  // return the length of the array
  return variablesBeforeInt.length;
};

// function to get the number of comment lines
const getCommentLines = (code) => {
  // regex to match the comments
  const commentRegex = /\/\/\s*\w+/g;
  // match the comments and return the length of the array
  const comments = code.match(commentRegex);
  // return the length of the array
  return comments?.length ?? 0;
};

// function to get the number of statements
const getStatements = (code) => {
  // split the code by the semicolon
  const lines = code.split(";");
  // return the length of the array
  return lines?.length - 1;
};
// get the number of variables, comments and statements
const variableAsIdentifierCount = getIdentifiers(data);
const commentCount = getCommentLines(data);
const statementCount = getStatements(data);

// log the results
console.log(`
Number of Variables:  ${variableAsIdentifierCount}
Number of Comments:  ${commentCount}
Number of Statements: ${statementCount}
`);



















































/*
Lab 2 (Compiler Design)
Topic: Fundamentals of Compiler

Introduction

	A compiler is a computer program that translates source code written in one programming language into another language. The most common reason for translating source code is to create an executable program. Compilers are implemented as part of the system software. Compilers are used to convert a source code written in a high-level programming language into machine code that the CPU understands and can directly execute. Some key aspects of compilers are:


•	Source Language: The source code that is given as input to the compiler is written in the source language. Common source languages include C, C++, Java, etc.

•	Target Language: The output of the compiler is the translated code in the target language. The target is usually the machine language or bytecode for a particular CPU or virtual machine.
•	Translation Process: The compiler analyzes and processes the source code through multiple stages like lexical analysis, syntax analysis, semantic analysis, intermediate code generation, code optimization and code generation to produce the target code.
•	Output: The final output of the compiler is an executable program or bytecodes that can be directly executed by the target machine or virtual machine.
•	Role: Compilers translate high-level language code into low-level machine instructions to bridge the gap between human programmers and the computer hardware. This enables software development at a higher level of abstraction.

In summary, a compiler translates programs written in a high-level language into low-level machine-executable code. It allows programming at a higher level of abstraction while retaining efficiency of direct execution.
 

Q1. What are the main stages of compilation?
A1. The main stages of compilation are:
1.	Lexical analysis 
2.	Syntax analysis 
3.	Semantic analysis 
4.	Intermediate code generation 
5.	Code optimization 
6.	Code generation 


Lexical Analysis

	Lexical analysis, also known as scanning, is the first phase of a compiler. In this phase, the compiler reads the source code as a sequence of characters and groups them into lexical tokens. Some key tasks done in lexical analysis include:


•	Tokenizing: Identifying individual linguistic elements in the code like keywords, identifiers, constants, operators, punctuation marks etc and separating them.
•	Comment removal: Removing comments from the source code as they are not part of the program semantics.
•	Whitespace and line breaks: Ignoring whitespace characters like spaces, tabs, newlines as they are only used for readability by humans.
•	Lexical errors: Detecting lexical errors like invalid characters, mismatching quotes, unterminated comments etc. and reporting them.
•	Input buffering: Reading the source code file a chunk at a time and converting it to tokens for further processing.


The output of lexical analysis is a sequence of tokens that serve as input to the parsing stage. A lexical analyzer or scanner creates a token stream that assists in parsing the code structure. Well-defined tokens help identify program syntax.


Q2. What are the main tasks performed in the lexical analysis phase?
A2. The main tasks performed in the lexical analysis phase are:
1.	Tokenizing 
2.	Comment removal 
3.	Whitespace and line break handling 
4.	Lexical error detection 
5.	Input buffering 

Syntax Analysis
Syntax analysis, also known as parsing, is the stage where the compiler analyzes the syntactic structure or grammar of the program. Based on the programming language grammar rules, the parser checks if the sequence of tokens received from the lexical analyzer conforms to the language syntax. Some key parsing tasks are:
•	Validating token order: Ensuring tokens occur in the right sequence as specified by grammar rules.
•	Context-free grammars: Using grammar rules written in Backus-Naur Form (BNF) or similar notation to describe allowed syntactic structures.
•	Parsing algorithms: Using parsing techniques like recursive descent, LL, LR etc to process tokens and build a parse tree.
•	Parse tree: Constructing an in-memory representation of program syntax as a parse tree or abstract syntax tree (AST).
•	Syntax errors: Detecting violations like missing tokens, incorrect syntax, unbalanced brackets etc. and reporting.
•	Symbol tables: Constructing symbol tables to track semantic details of program identifiers at parse time itself.
•	Intermediate representation: Generating an intermediate format to represent validated syntax for later stages.

On successful parsing, the compiler receives an internal syntactic structure to process semantics. Parsing establishes basic structural validity of the source code.
 
Q3. What are some common parsing techniques used in compilers?
A3. Some common parsing techniques used in compilers include:
1.	Recursive descent parsing 
2.	LL parsing 
3.	LR parsing 
4.	LALR parsing 

Semantic Analysis

Semantic analysis follows syntax analysis to check for semantic or meaning-based correctness of the program. Some key tasks performed are:

•	Type checking: Validating the types of variables, function parameters and return values based on their use and declarations.
•	Scope analysis: Analyzing scope and lifetime of variables and functions based on block structure in the program.
•	Symbol resolution: Resolving symbolic names to their definitions using the symbol tables constructed during parsing.
•	Control flow analysis: Analyzing branching structure, loops for syntactic correctness.
•	Data flow analysis: Checking for appropriate use of variables based on their definitions and assignments.
•	Constant folding: Substituting constant expressions with their values at compile time.
•	Exception handling: Analyzing exception specification clauses, try-catch blocks.
•	Optimization hints: Gathering information to benefit later stages like common subexpression elimination.

Semantic analysis requires both syntactic information from parsing and language defined semantic rules. It ensures code conforms to language semantics and catch logical errors early.

 
Q4. What are some common semantic errors checked by compilers?
A4: Some common semantic errors checked by compilers include:
1.	Type mismatches 
2.	Undeclared variables 
3.	Redefined variables 
4.	Invalid array indices 
5.	Incompatible function calls 
6.	Missing return statements 
7.	Invalid flow control constructs 
8.	Untranslatable language features 

Intermediate Representation


After syntactic and semantic analysis, an intermediate representation (IR) is generated by the compiler which acts as a link between source code and target code. Some key properties of intermediate code are:

•	Machine independent: Does not depend on target machine features. Portable across machine architectures.
•	Less complex than source code: Stripped of language specific syntax items. Encodes procedural/data semantics.
•	Graph-based: Can be represented as control flow graphs, data flow graphs for analysis.
•	Targets multiple back ends: Single intermediate code can generate code for different target machines.
•	Optimization friendly: Helps applying many useful optimizations like common subexpression elimination, constant propagation etc.
•	
Common intermediate representations used include: three-address code, bytecode, abstract syntax trees etc. Popular compilers like LLVM and GCC generate IR that serves as input for optimizations and backend code generation phases.


Q5. What are some common types of intermediate representations used in compilers?
A5. Some common types of intermediate representations used in compilers are:
1.	Three-address code 
2.	Bytecode 
3.	Abstract syntax trees (ASTs) 
4.	Control flow graphs (CFGs) 
5.	Static single assignment form (SSA) 
Code Optimization


Code optimization transforms the intermediate representations to improve some aspects of the generated code like size, speed, or resource usage without changing external program behavior. Potential optimization techniques include:
•	Common subexpression elimination: Avoiding duplicate computation of subexpressions.
•	Constant folding and propagation: Substituting constant values wherever possible for efficient substitution.
•	Strength reduction: Replacing expensive operations with cheaper equivalents.
•	Loop optimizations: Transforming loops to enable optimizations like unrolling, induction variables etc.
•	Instruction scheduling: Reordering instructions to minimize delays and improve instruction-level parallelism.
•	Memory access optimizations: Optimizing memory usage via techniques like cache blocking.
•	Interprocedural analysis: Analyzing across function calls for whole program information.
•	Data flow optimizations: Based on definition-use chains to perform relevant optimizations.
•	Parallelism extraction: Enabling simultaneous execution by exposing task, data and pipeline parallelism.

Optimization requires analysis and transformation of intermediate representations for code quality and efficiency gains.

Q6: What are some popular loop optimizations performed by compilers?
A6: Some popular loop optimizations performed by compilers include:
1.	Loop unrolling 
2.	Induction variable elimination 
3.	Strength reduction of loop indices 
4.	Loop blocking for caches 
5.	Software pipelining 
6.	Loop fusion and distribution 
7.	Parallelization of independent loops  
Code Generation


Code generation is the final stage of compilation where target code is emitted from the optimized intermediate representation based on the target architecture. Key tasks include:
•	Register allocation: Mapping logical registers used in IR to physical registers available in target machine.
•	Instruction selection: Translating IR operations to equivalent target machine instructions.
•	Addressing mode selection: Deciding memory addressing schemes like base+offset.
•	Instruction scheduling: Sequencing instructions
•	Liveness analysis: Determining points where variables come alive and die to free registers optimally.
•	Spilling: Temporarily storing registers to memory when run out to free registers for other uses.
•	Peephole optimizations: Applying local transformations to improve generated code sequence.
•	Jump optimization: Converting conditional branches to efficient forms.
•	Exception handling code: Generating target-specific exception/signal handling routines.
•	Linking: Linking object/executable code with requisite library functions and system interfaces.

Common backends target ISAs like x86, ARM, RISC-V, and produce assembler, object, or executable files. Code generation largely depends on target machine architecture.

Q7. What is register allocation and why is it an important code generation task?
A7. Register allocation is the process of assigning high-level variables and temporaries that reside in memory in the intermediate representation, to machine registers available in the target processor. It is an important task because registers allow far faster access than memory. Efficient register allocation can significantly improve program performance by minimizing data transfers between registers and memory.

Compiler Construction

The process of building a compiler involves multiple phases requiring analysis, implementation and integration of concepts across each stage. Some key aspects include:

•	Lexical specification: Defining lexical rules, patterns, tokenization algorithms.
•	Context-free grammar: Specifying source language syntax using grammars like BNF.
•	Parsing: Implementing recursive descent or table-driven parsing algorithms.
•	Symbol tables: Designing representations for managing identifiers, scopes.
•	Type checking: Implementing semantic rules for static typesafety.
•	Intermediate representation: Choosing suitable IR and implementing an IR builder.
•	Optimization passes: Developing analysis and transformations for optimizations.
•	Code generators: Implementing instruction selection, register allocation algorithms.
•	Phased compilation: Constructing modular, phase-ordered compilation framework.
•	Testing: Developing test suites covering languages constructs, edge cases.
•	Tools: Using parser/lexer generators, LLVM, Eclipse IDEs for accelerated development.

Overall, compiler construction is a challenging programming project requiring expertise in PL concepts, algorithms and systems programming. Modularity and iterative design refinement are key.
Q8. What are some common tools and techniques used for compiler construction?
A8. Some commonly used tools and techniques in compiler construction include:
•	Lex/Flex for lexical analyzer generation 
•	YACC/Bison for parser generator 
•	Clang/LLVM as frameworks for IR, optimizations, code generation 
•	Modular, phase-ordered compiler design 
•	Strong typing for implementation safety 
•	Automated unit testing of compiler phases 
•	Automated regression testing 
•	Parser/Lexer generators like ANTLR for DSLs 
•	Static analysis tools for compiler implementation quality 
Popular Compiler Implementations
Some widely used and influential compiler implementations include:
•	GCC (GNU Compiler Collection): Open-source C, C++, Fortran, Ada, Go compilers. Uses GIMPLE as IR.
•	LLVM (Low Level Virtual Machine): Industry standard, open-source framework for optimizations, codegen. Uses LLVM-IR.
•	OpenJDK/HotSpot: The official Java Platform from Oracle, supports Just-In-Time compilation to native code.
•	.NET Framework: Manages languages like C#, Visual Basic.NET using Common Intermediate Language.
•	WebAssembly Compiler: Compiles web formats like WebAssembly to native code for browsers.
•	Python Interpreters: CPython (reference), PyPy (JIT capable), support compilation to bytecode.
•	Ruby Implementations: Traditional CRuby, MRuby (embedded/IoT), TruffleRuby (JVM), use YARV bytecode.
•	JavaScript Engines: V8 (Chrome), SpiderMonkey (Firefox), implement Just-In-Time compilation.
•	Rust Compiler: Multistage compiler (rustc) for the Rust systems programming language.

These demonstrate the diversity of compiler implementations across domains, platforms and paradigms. Performance and portability remain key goals.

Q9: What are some notable differences between interpreted and compiled languages?
Some key differences between interpreted and compiled languages include:
Interpreted languages:
•	Source code is executed line by line by an interpreter at runtime. 
•	No separate compilation process, portable across platforms. 
•	Slower execution compared to native code since interpreted. 
•	Dynamic or incremental compilation allowed e.g. JIT. 
•	Examples: Python, Ruby, PHP, JavaScript. 
Compiled languages:
•	Source code is compiled ahead of time into machine-specific executable. 
•	Faster execution since directly executed as native code. 
•	Requires a full compilation process, resulting executables not portable. 
•	Static compilation done upfront, no interpretation at runtime. 
•	Examples: C, C++, Rust, Go, Fortran. 
Some languages support both modes:
•	Java/C#: Compiled to bytecode, interpreted by JVM/CLR JIT. 
•	LLVM IR: Can generate native executables or interpreted IR. 
•	Transcompiled: Transpiled to another language for compilation. 
Overall, interpretation enables portability while compilation offers performance. Many modern languages combine the benefits.
 
Compiler Types:
There are various types of compilers which are as follows −
•	Traditional Compilers(C, C++, and Pascal) − These compilers transform a source program in an HLL into its similar in native machine program or object program.
•	Interpreters (LISP, SNOBOL, and Java1.0) − These Compilers first convert Source code into intermediate code, and then interprets (emulates) it to its equivalent machine code.
•	Cross-Compilers − These are the compilers that run on one machine and make code for another machine. A cross compiler is a compiler adequate for making executable code for a platform other than the one on which the compiler is running. Cross compiler tools are used to create executables for installed systems or several platforms.
•	Incremental Compilers − Incremental Compiler is a compiler, which executes the recompilation of only a changed source instead of compiling the complete source code.
•	Converters (e.g. COBOL to C++) − These programs will be compiling from one high-level language to another.
•	Just-In-Time (JIT) Compilers (Java, Micosoft.NET) − These are the runtime compilers from intermediate language (byte code, MSIL) to executable code or native machine code. These implement type-based verification which creates the executable code more authentic.
•	Single-Pass Compiler − In a single-pass compiler, when a line source is processed it is scanned and the tokens are extracted. Thus the syntax of the line is inspected and the tree structure and some tables including data about each token are constructed. Finally, after the semantical element is tested for correctness, the code is created. The same process is repeated for each line of code until the whole program is compiled. Usually, the entire compiler is built around the parser, which will call procedures that will perform different functions.
•	Multi-Pass Compiler − The compiler scans the input source once and makes the first modified structure, therefore scans the first-produced form and makes a second modified structure, etc., until the object form is produced. Such a compiler is known as a multi-pass compiler.
•	Ahead-of-Time (AOT) Compilers (e.g., .NET ngen) − These are the pre-compilers to the native code for Java and .NET.
•	Binary Compilation − These compilers will be compiling the object code of one platform into the object code of another platform.
•	Bootstrap Compiler - it is initially implemented in the same language it is designed to compile. It is used to compile a subset of the language, gradually improving and extending itself through multiple iterations.
JIT ( Just in Time ) Compiler 
Just-in-time (JIT) compilation is a technique where a compiler compiles source code to native machine code during runtime rather than prior to execution. Some key characteristics:

•	Code optimization: JIT can perform profiling at runtime to optimize compilation based on actual execution patterns.
•	Native speed: Compiled code has near-native speed compared to interpreted bytecode.
•	Laziness: Compilation is done lazily only for portions of code being actively executed.
•	Dynamic languages: Suites dynamic typing, hot-swapping of classes and modules at runtime.
•	Portability: Achieves efficiency of compilation without sacrificing cross-platform benefits of interpretation.
•	Adaptive optimization: JIT can re-optimize or de-optimize based on profile changes during execution.

Popular JIT compilers include V8 (JavaScript), HotSpot JVM, .NET CLR, Python PyPy. JIT bridges the performance gap by compiling hot/active parts to native code instead of full ahead-of-time compilation. Overall it combines benefits of interpretation and compilation.
Some disadvantages are increased runtime compilation overhead and complexity compared to pure interpretation or compilation. Profiling cost also incurred to guide optimizations.

Q1: What is the primary purpose of a JIT compiler in the context of programming languages?
A1: The primary purpose of a JIT (Just-In-Time) compiler is to translate intermediate code, often bytecode, into machine code at runtime. This dynamic compilation allows for the execution of high-level language programs on specific hardware architectures, combining the benefits of interpretation and compilation.



Q2: Can you briefly explain the key difference between a JIT compiler and a traditional (ahead-of-time) compiler?
A2: The key difference lies in the timing of compilation. A traditional compiler (ahead-of-time) translates the entire source code into machine code before execution, generating standalone executables. In contrast, a JIT compiler performs compilation at runtime, translating code as needed, often from an intermediate representation like bytecode. This dynamic approach enables adaptive optimizations and platform-specific code generation.
Challenges in JIT Implementation
Some key challenges in implementing a JIT compiler include:
•	Profiling overhead: Collecting execution profile data incurs runtime overhead which impacts performance.
•	Optimization space: Huge search space to find best optimizations based on runtime profiles. Requires heuristics.
•	Time constraints: Compilation must happen quickly and not impact perceived performance of interpreted code.
•	Recompilation: Deciding when to recompile based on profile changes without wasting effort.
•	Code size: Frequent compilation and optimization can increase final code size significantly.
•	Memory consumption: Require memory space for runtime profiling data structures and compiled code.
•	Self-hosting: JIT itself must be efficient since it is part of the runtime system compiled by itself.
•	Platform dependence: Optimizing for specific hardware requires knowledge of instruction sets, caches etc.
•	Debugging: Mapping between interpreted and compiled code complicates debugging tasks.
•	Stability: Optimization errors can crash or hang the whole application at runtime.

To summarize, balancing compilation speed, optimization effectiveness, memory usage and stability is crucial for good JIT compiler design.


*/