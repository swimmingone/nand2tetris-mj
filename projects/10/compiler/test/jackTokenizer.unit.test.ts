import { describe, it } from 'vitest';
import { jackTokenizer } from '../src/jackTokenizer';

describe('jackTokenizer', () => {
  it('should pass', () => {
    const codes = `
// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/10/ExpressionLessSquare/Main.jack

/** Expressionless version of projects/10/Square/Main.jack. */

class Main {
    static boolean test;    // Added for testing -- there is no static keyword
                            // in the Square files.

    function void main() {
        var SquareGame game;
        let game = game;
        do game.run();
        do game.dispose();
        return;
    }

    function void more() {  // Added to test Jack syntax that is not used in
        var boolean b;      // the Square files.
        if (b) {
        }
        else {              // There is no else keyword in the Square files.
        }
        return;
    }
}
    `
      .trim()
      .split('\n');

    let currentLineNumber = 0;
    const readLine = () => {
      const line = codes[currentLineNumber];
      currentLineNumber += 1;

      if (typeof line === 'undefined') {
        return null;
      }

      console.log('line: ', line);

      return line;
    };

    const tokenizer = jackTokenizer(readLine);

    for (;;) {
      tokenizer.advance();
      if (!tokenizer.hasMoreTokens()) {
        break;
      }

      console.log('tokenType: ', tokenizer.tokenType());
    }
  });
});
