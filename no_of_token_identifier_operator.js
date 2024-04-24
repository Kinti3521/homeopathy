const fs = require('fs');

// Function to check if a character is an operator
function isOperator(c) {
    const operators = "+-*/%=<>&|^";
    return operators.includes(c);
}

// Function to count tokens, identifiers, and operators
function analyzeFile(filename) {
    let tokenCount = 0;
    let identifierCount = 0;
    let operatorCount = 0;

    // Read file contents
    const fileContent = fs.readFileSync(filename, 'utf8');

    // Split file contents into tokens
    const tokens = fileContent.split(/\s+/);

    // Iterate through tokens and count identifiers and operators
    for (let token of tokens) {
        tokenCount++;
        // Check if the token is an identifier
        if (/^[a-zA-Z_]\w*$/.test(token)) {
            identifierCount++;
        }
        // Check if the token is an operator
        if (token.length === 1 && isOperator(token)) {
            operatorCount++;
        }
    }

    // Output results
    console.log("Number of tokens:", tokenCount);
    console.log("Number of identifiers:", identifierCount);
    console.log("Number of operators:", operatorCount);
}

// Analyze the file
analyzeFile('./TRDF.c');

/*
───────┬───────────────────────────────────────────────────────────────────────────────────────────────
       │ File: TDRF.c
───────┼───────────────────────────────────────────────────────────────────────────────────────────────
   1   │ #include <stdio.h>
   2   │ // declare fibonacci recursive function
   3   │ int fibonacci(int n, int a, int b) {
   4   │     if (n == 0) 
   5   │         return a; // if n is 0, return a
   6   │     if (n == 1)
   7   │         return b; // if n is 1, return b
   8   │     return fibonacci(n - 1, b, a + b); // if n is greater than 1, call fibonacci recursively
   9   │ }
  10   │ 
  11   │ int main() {
  12   │     int n = 10; // Change this to any desired value
  13   │     int result = fibonacci(n, 0, 1); // call fibonacci function
  14   │     printf("Fibonacci series value at position %d is %d\n", n, result); // print the result
  15   │     return 0;
  16   │ }
  17   │ 
───────┴───────────────────────────────────────────────────────────────────────────────────────────────
*/

/* OUTPUT
Number of tokens: 102
Number of identifiers: 54
Number of operators: 4
*/






























































/*
Lab 3 (Compiler Design)
Topic: Review of Finite Automata and Regular Expressions in Compiler Design

Introduction
Compiler design is a complex field that involves translating high-level programming languages into machine code. Two fundamental concepts in this process are Finite Automata (FA) and Regular Expressions (RE). These concepts play a crucial role in lexical analysis, the first phase of the compilation process. In this review, we will delve into the basics of Finite Automata and Regular Expressions and explore their applications in compiler design.
1. Finite Automata (FA)
1.1 Definition and Types
Finite Automata are abstract mathematical models used to describe and analyze the behavior of systems with a finite number of states. In compiler design, Finite Automata are commonly employed to recognize and tokenize the input source code.
1.1.1 Deterministic Finite Automaton (DFA)
A Deterministic Finite Automaton is characterized by a set of states, a set of input symbols, a transition function, an initial state, and a set of accepting states. The transition from one state to another is determined by the input symbol, and the automaton either accepts or rejects the input based on its final state.
1.1.2 Nondeterministic Finite Automaton (NFA)
Nondeterministic Finite Automata allow multiple transitions from a state on a given input symbol. They are more expressive than DFAs but are often converted to DFAs for practical implementation in lexical analysis.
1.2 Transition Diagrams
Transition diagrams are graphical representations of Finite Automata. These diagrams provide an intuitive visualization of the state transitions and help in understanding the behavior of the automaton.
1.3 Applications in Compiler Design
Finite Automata are widely used in lexical analysis to recognize patterns and token boundaries in the source code. Lexical analyzers, also known as scanners, use Finite Automata to perform efficient and accurate tokenization.
2. Regular Expressions (RE)
2.1 Definition and Syntax
Regular Expressions are formal languages that describe patterns of strings. They consist of a combination of literals and special characters that define a set of strings. Regular Expressions are a powerful tool for specifying lexical patterns in compiler design.
2.1.1 Basic Syntax
•	Concatenation: The concatenation of two regular expressions represents the set of strings formed by concatenating a string from the first expression with a string from the second expression.
•	Union: The union of two regular expressions represents the set of strings that are either in the first expression or the second expression.
•	Kleene Star: The Kleene star of a regular expression represents zero or more occurrences of the expression.
2.2 Relationship with Finite Automata
There is a close relationship between Regular Expressions and Finite Automata. In fact, every regular expression can be converted into an equivalent Finite Automaton, and vice versa. This connection is vital in the design and implementation of lexical analyzers.
2.3 Applications in Compiler Design
Regular Expressions are employed in lexical analysis to define the patterns of tokens. Lexical rules for identifiers, keywords, operators, and other language constructs are often specified using Regular Expressions.
3. Conversion between FA and RE
3.1 NFA to DFA Conversion
The conversion from Nondeterministic Finite Automaton to Deterministic Finite Automaton is a crucial step in the implementation of lexical analyzers. The subset construction algorithm is commonly used for this conversion.
3.2 RE to NFA Conversion
Converting Regular Expressions to Nondeterministic Finite Automata is a fundamental step in the integration of lexical rules into the compiler design. Thompson's construction algorithm is a widely-used method for this conversion.
4. Optimization Techniques
4.1 Minimization of DFAs
Minimizing Deterministic Finite Automata is essential for improving the efficiency of lexical analyzers. The Hopcroft's algorithm is commonly employed for DFA minimization.
4.2 Optimizing Regular Expressions
Optimizing Regular Expressions can improve the performance of lexical analyzers. Techniques such as factoring common subexpressions and using more efficient constructs contribute to better overall efficiency.
5. Case Studies
5.1 Lexical Analysis in Compiler Front Ends
Examining real-world examples of lexical analysis in compiler front ends provides insights into how Finite Automata and Regular Expressions are applied in practice. Case studies from popular programming languages can illustrate the effectiveness of these concepts.
Conclusion
In this comprehensive review, we've explored the fundamentals of Finite Automata and Regular Expressions in the context of compiler design. Understanding these concepts is crucial for developing efficient and accurate lexical analyzers, which are fundamental components in the compilation process. As compiler design continues to evolve, the role of Finite Automata and Regular Expressions remains central to the success of lexical analysis and, consequently, the entire compilation process.
 
6. Error Handling in Lexical Analysis
6.1 Error Detection and Recovery
In lexical analysis, it is crucial to handle errors gracefully. Finite Automata and Regular Expressions can be extended to incorporate error detection mechanisms. When an input string does not match any defined pattern, the lexical analyzer must detect and recover from errors. This involves strategies such as reporting the error, discarding the erroneous token, and resynchronizing to continue parsing.
6.2 Panic Mode Recovery
Panic mode recovery is a common technique employed in lexical analysis. When an error is detected, the lexer enters a "panic" mode, skipping characters until a predefined recovery point is reached. This helps in preventing cascading errors and facilitates the resumption of normal parsing.
7. Extended Finite Automata
7.1 Extended Transition Functions
Extended Finite Automata (EFA) expand on the concept of Finite Automata by introducing extended transition functions. These functions allow transitions based on additional information, such as the current parsing context or semantic actions associated with certain transitions. EFAs enhance the expressive power of lexical analyzers, enabling them to capture more complex language constructs.
7.2 Semantic Actions
Semantic actions associated with transitions in Extended Finite Automata are essential for building a bridge between lexical and syntax analysis. These actions define the behavior of the compiler when specific patterns are recognized. This integration facilitates the construction of the Abstract Syntax Tree (AST) during subsequent parsing phases.
8. Lexical Analyzer Generators
8.1 Overview of Lexical Analyzer Generators
Lexical Analyzer Generators, such as Lex and Flex, automate the process of generating lexical analyzers from regular expressions. These tools take a set of regular expressions as input and produce efficient Finite Automata-based lexical analyzers in the target programming language.
8.2 Lex and Yacc Integration
Lexical Analyzer Generators are often used in conjunction with parser generators like Yacc (Yet Another Compiler Compiler). This integration allows for a seamless transition from lexical to syntax analysis, ensuring a well-coordinated compilation process.
9. Finite Automata in String Matching
9.1 String Matching Algorithms
Beyond compiler design, Finite Automata find applications in various fields, including string matching. The Knuth-Morris-Pratt algorithm and the Boyer-Moore algorithm leverage Finite Automata concepts to efficiently search for patterns in strings. Understanding these algorithms provides insights into their adaptability across different domains.
9.2 Regular Expression Matching Engines
Regular expression engines, employed in various programming languages, implement sophisticated algorithms for matching patterns in strings. The integration of Finite Automata-based approaches in these engines contributes to their efficiency and speed.
10. Emerging Trends in Compiler Design
10.1 Just-In-Time Compilation
Just-In-Time (JIT) compilation is an evolving trend in compiler design, where code is compiled at runtime rather than ahead of time. This dynamic approach poses challenges for lexical analysis due to the need for efficient and on-the-fly tokenization. Innovations in Finite Automata and Regular Expression processing contribute to the adaptability of lexical analyzers in JIT compilation environments.
10.2 Domain-Specific Languages (DSLs)
The rise of Domain-Specific Languages calls for specialized lexical analysis tailored to the unique syntax and semantics of each domain. Finite Automata and Regular Expressions play a pivotal role in the creation of lexers for DSLs, providing a flexible and efficient means of specifying language constructs.
11. Comparative Analysis with Other Parsing Techniques
11.1 Recursive Descent Parsing
Comparing Finite Automata-based lexical analysis with other parsing techniques, such as Recursive Descent Parsing, highlights the strengths and weaknesses of each approach. While Recursive Descent Parsing provides a top-down approach to syntax analysis, Finite Automata excel in the efficient recognition of regular languages.
11.2 LR Parsing
LR parsing, including LALR (Look-Ahead LR) and SLR (Simple LR) parsing, is widely used in compiler construction. Understanding the interplay between lexical analysis using Finite Automata and LR parsing in syntax analysis enhances the overall comprehension of compiler design.
12. Challenges and Future Directions
12.1 Handling Unicode and Multilingual Support
The increasing prevalence of multilingual programming environments introduces challenges in lexical analysis, particularly concerning Unicode character sets. Future developments in Finite Automata and Regular Expressions must address these challenges to ensure robust and inclusive lexical analyzers.
12.2 Parallelism and Concurrent Compilation
As computing architectures evolve towards parallelism, compiler design faces challenges in accommodating concurrent compilation processes. Exploring how Finite Automata and Regular Expressions can be adapted to parallel processing environments is an area ripe for future research.
Conclusion (Revisited)
In conclusion, this expanded review has delved deeper into various aspects of Finite Automata and Regular Expressions in the context of compiler design. From error handling and extended Finite Automata to lexical analyzer generators and emerging trends, the intricate interplay of these concepts continues to shape the landscape of compiler construction. As the field evolves, researchers and practitioners must navigate the complexities of multilingual support, parallelism, and new parsing techniques to advance the efficiency and adaptability of compilers in a rapidly changing computing landscape.
13. Memory Management in Lexical Analysis
13.1 Token Storage and Memory Efficiency
Efficient memory management is critical in compiler design, particularly in the context of lexical analysis. The storage and retrieval of tokens involve considerations for memory optimization. Techniques such as token pooling and memory recycling contribute to the overall efficiency of lexical analyzers.
13.2 Garbage Collection Strategies
Garbage collection mechanisms play a vital role in managing dynamically allocated memory during lexical analysis. Exploring strategies for garbage collection and their impact on the performance of the compiler provides insights into the balance between memory efficiency and runtime overhead.
14. Regular Expression Libraries and Language Support
14.1 Standard Libraries for Regular Expressions
Many programming languages come equipped with standard libraries that provide powerful tools for working with Regular Expressions. A detailed examination of these libraries, including their features, performance, and limitations, offers practical insights for developers working on compiler design projects.
14.2 Cross-Language Compatibility
Compiler designers often face the challenge of ensuring cross-language compatibility in the presence of diverse Regular Expression libraries. Analyzing strategies for achieving interoperability between different language ecosystems contributes to the development of versatile and adaptable compilers.
15. Security Considerations in Lexical Analysis
15.1 Buffer Overflows and Input Sanitization
Security vulnerabilities in compilers can have severe consequences. Understanding the role of lexical analysis in preventing common issues like buffer overflows through robust input sanitization is crucial. Finite Automata and Regular Expressions are integral to implementing secure input handling mechanisms.
15.2 Cross-Site Scripting (XSS) and Injection Attacks
Exploring how lexical analysis can contribute to mitigating Cross-Site Scripting (XSS) and injection attacks enhances the security posture of compilers. Techniques such as input validation and pattern matching using Regular Expressions play a crucial role in preventing these types of vulnerabilities.
16. Human-Readable Error Messages
16.1 Importance of Clarity in Error Reporting
Compiler-generated error messages significantly impact the developer experience. Enhancing the clarity of error messages produced during lexical analysis improves debugging and helps developers identify and fix issues more effectively.
16.2 Contextual Error Messages
Incorporating contextual information into error messages enhances their utility. Finite Automata and Regular Expressions can be leveraged to provide more informative error messages that pinpoint the location and nature of syntax errors in the source code.
17. Machine Learning Integration in Lexical Analysis
17.1 Neural Networks for Tokenization
Recent advancements in machine learning open up new possibilities for integrating neural networks into lexical analysis. Exploring the use of neural networks for tokenization, possibly in conjunction with traditional Finite Automata approaches, presents an exciting avenue for research and development.
17.2 Anomaly Detection and Security
Machine learning techniques can be applied to detect anomalies in source code, potentially identifying security vulnerabilities during lexical analysis. This intersection of machine learning and compiler design holds promise for enhancing the overall security of software systems.
18. Real-Time Compilation and Lexical Analysis
18.1 Real-Time Constraints in Compilation
In certain applications, real-time compilation is essential, imposing stringent constraints on lexical analysis performance. Examining how Finite Automata and Regular Expressions can be optimized for real-time compilation scenarios sheds light on the challenges and potential solutions in this domain.
18.2 Streaming Compilation and Incremental Lexical Analysis
For applications with continuous integration or frequent updates, streaming compilation and incremental lexical analysis become critical. Understanding how lexical analyzers can adapt to incremental changes in source code without reprocessing the entire file is essential for optimizing build times.
19. Case Studies on Compiler Optimization
19.1 Compiler Optimizations Beyond Lexical Analysis
While lexical analysis is the initial phase in compilation, exploring case studies on optimizations throughout the compiler pipeline provides a holistic perspective. Techniques such as loop unrolling, inlining, and register allocation showcase the continuous efforts to improve compiler performance.
19.2 Interplay Between Lexical and Semantic Analysis Optimizations
The interaction between lexical and semantic analysis optimizations is a nuanced aspect of compiler design. Analyzing case studies that highlight how improvements in lexical analysis can impact subsequent optimization phases provides valuable insights into the interconnected nature of the compilation process.
20. Ethical Considerations in Compiler Design
20.1 Bias and Fairness
Compiler design decisions can inadvertently introduce bias into the software development process. Examining the ethical considerations related to bias and fairness in lexical analysis prompts reflection on the societal impact of compilers and the responsibility of developers to create inclusive tools.
20.2 Accessibility and Universal Design
Ensuring that compilers are accessible to developers with diverse needs is an ethical imperative. Exploring how lexical analysis can contribute to universal design principles enhances the usability and inclusivity of programming environments.
Conclusion (Final Reflection)
In this extended exploration of Finite Automata, Regular Expressions, and their applications in compiler design, we've delved into advanced topics and emerging trends. The dynamic landscape of compiler construction continually challenges developers to balance efficiency, security, and ethical considerations. As the field evolves, the synergy between traditional compiler techniques and innovative approaches, including machine learning integration and security considerations, will shape the future of compiler design. By maintaining a holistic perspective and addressing the diverse facets of lexical analysis, compiler designers can contribute to the creation of robust, secure, and inclusive software systems.


*/