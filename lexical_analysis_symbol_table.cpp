/*
	Q) Write a Lexical Anyalzer which take input file and prints the symbol table
		- Token types: IDENTIFIER, ASSIGNMENT, NUMBER, OPERATOR, UNKNOWN
*/

#include <iostream>
#include <fstream>
#include <string>
#include <unordered_map>
#include <cctype>

using namespace std;

// Token types
enum TokenType {
    IDENTIFIER,
    ASSIGNMENT,
    NUMBER,
    OPERATOR,
    UNKNOWN
};

// Symbol table
unordered_map<string, TokenType> symbolTable;

// Helper function to determine token type
TokenType getTokenType(const string& token) {
    if (isdigit(token[0])) {
        return NUMBER;
    } else if (isalpha(token[0])) {
        return IDENTIFIER;
    } else if (token == "=") {
        return ASSIGNMENT;
    } else if (token.length() == 1 && (token == "+" || token == "-" || token == "*" || token == "/" )){
        return OPERATOR;
    }
    return UNKNOWN;
}

// Lexical parser function
void lexicalParser(const string& inputFilePath, const string& outputFilePath) {
    ifstream inputFile(inputFilePath);
    ofstream outputFile(outputFilePath);

    if (!inputFile.is_open()) {
        cerr << "Error opening input file" << endl;
        return;
    }

    string token;
    while (inputFile >> token) {
        TokenType tokenType = getTokenType(token);
        symbolTable[token] = tokenType;
        outputFile << "{ type : " << tokenType << ", value: " << token << " }" << endl;
    }

    inputFile.close();
    outputFile.close();

    cout << "Symbol Table:" << endl;
    for (const auto& entry : symbolTable) {
        cout << entry.first << " : " << entry.second << endl;
    }

    // Print the enum values
    cout << "\nEnum Values:" << endl;
    cout << "IDENTIFIER: " << IDENTIFIER << endl;
    cout << "ASSIGNMENT: " << ASSIGNMENT << endl;
    cout << "NUMBER: " << NUMBER << endl;
    cout << "OPERATOR: " << OPERATOR << endl;
    cout << "UNKNOWN: " << UNKNOWN << endl;
}

int main() {
    const string inputFilePath = "input.txt";
    const string outputFilePath = "output.txt";

    lexicalParser(inputFilePath, outputFilePath);

    return 0;
}

/*
───────┬───────────────────────────────────────────────────────────────────────────────────────────────
       │ File: input.txt
───────┼───────────────────────────────────────────────────────────────────────────────────────────────
   1   │ A = 1
   2   │ B = 2
   3   │ D = 3
   4   │ E = A + D
   5   │ C = E + B
───────┴───────────────────────────────────────────────────────────────────────────────────────────────
*/

/*
# OUTPUT
Symbol Table:
E : 0
+ : 3
2 : 2
B : 0
3 : 2
1 : 2
= : 1
C : 0
D : 0
A : 0

Enum Values:
IDENTIFIER: 0
ASSIGNMENT: 1
NUMBER: 2
OPERATOR: 3
UNKNOWN: 4
*/






























































/*
Lab 7 (Compiler Design)
Topic: TOP-DOWN Parsing

•	Parsing
Parsing is the process of converting information from one type to another. The parser is a component of the translator in the organization of linear text structure according to a set of defined rules known as grammar.
•	Types of the Parser:
Parser is divided into two types:
•	Bottom-up parser
•	Top-down parser

•	Bottom-Up Parser
A bottom-up parser is a type of parsing algorithm that starts with the input symbols to construct a parse tree by repeatedly applying production rules in reverse until the start symbol is reached. Bottom-up parsers are also known as shift-reduce parsers because they shift input symbols onto the parse stack until a set of consecutive symbols can be reduced by a production rule.

•	Top-Down Parser
A top-down parser in compiler design can be considered to construct a parse tree for an input string in preorder, starting from the root. It can also be considered to create a leftmost derivation for an input string. The leftmost derivation is built by a top-down parser. A top-down parser builds the leftmost derivation from the grammar’s start symbol. Then it chooses a suitable production rule to move the input string from left to right in sentential form.
When the parser starts constructing the parse tree from the start symbol and then tries to transform the start symbol to the input, it is called top-down parsing.

•	Recursive descent parsing : It is a common form of top-down parsing. It is called recursive as it uses recursive procedures to process the input. Recursive descent parsing suffers from backtracking.

•	Backtracking : It means, if one derivation of a production fails, the syntax analyzer restarts the process using different rules of same production. This technique may process the input string more than once to determine the right production.

•	About Top-Down Parsing:
Top-down parsing is a parsing-method where a sentence is parsed starting from the root of the parse tree (with the "Start" symbol), working recursively down to the leaves of the tree (with the terminals). In practice, top-down parsing algorithms are easier to understand than bottom-up algorithms. Not all grammars can be parsed top-down, but most context-free grammars can be parsed bottom-up.

•	Leftmost derivation:
It is a process of exploring the production rules from left to right and selecting the leftmost non-terminal in the current string as the next symbol to expand. This approach ensures that the parser always chooses the leftmost derivation and tries to match the input string. If a match cannot be found, the parser backtracks and tries another production rule. This process continues until the parser reaches the end of the input string or fails to find a valid parse tree

•	Another Example of Top-Down Parsing
Consider the lexical analyzer’s input string ‘acb’ for the following grammar by using left most deviation.
S->aAb
A->cd | c

•	Recursive-descent parsers: Recursive-descent parsers are a type of top-down parser that uses a set of recursive procedures to parse the input. Each non-terminal symbol in the grammar corresponds to a procedure that parses input for that symbol.
•	Backtracking parsers: Backtracking parsers are a type of top-down parser that can handle non-deterministic grammar. When a parsing decision leads to a dead end, the parser can backtrack and try another alternative. Backtracking parsers are not as efficient as other top-down parsers because they can potentially explore many parsing paths.
•	Non-backtracking parsers: Non-backtracking is a technique used in top-down parsing to ensure that the parser doesn’t revisit already-explored paths in the parse tree during the parsing process. This is achieved by using a predictive parsing table that is constructed in advance and selecting the appropriate production rule based on the top non-terminal symbol on the parser’s stack and the next input symbol. By not backtracking, predictive parsers are more efficient than other types of top-down parsers, although they may not be able to handle all grammar.
•	Predictive parsers: Predictive parsers are top-down parsers that use a parsing to predict which production rule to apply based on the next input symbol. Predictive parsers are also called LL parsers because they construct a left-to-right, leftmost derivation of the input string.

•	LL(k) grammars:
Top-down grammars are referred to as LL(k) grammars:
- The first L indicates Left-to-Right scanning.
- The second L indicates Left-most derivation
- The k indicates k lookahead characters.
We will be examining LL (1) grammars, which spot errors at the earliest opportunity but provide strict requirements on our grammars.

Advantages of Top-Down Parsing
•	Top-down parsing is much simple.
•	It is incredibly easy to identify the response action of the top-down parser.
Disadvantages of Top-Down Parsing
•	Top-down parsing cannot handle left recursion in the grammar’s present.
•	When using recursive descent parsing, the parser may need to backtrack when it encounters a symbol that does not match the expected token. This can make the parsing process slower and less efficient.
 
*/