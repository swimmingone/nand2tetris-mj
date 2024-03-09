package kim.myeongjae.hackassembler

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class AssemblerKtTest : StringSpec({

    "Add" {
        assemble(
            """
            // This file is part of www.nand2tetris.org
            // and the book "The Elements of Computing Systems"
            // by Nisan and Schocken, MIT Press.
            // File name: projects/06/add/Add.asm

            // Computes R0 = 2 + 3  (R0 refers to RAM[0])

            @2
            D=A
            @3
            D=D+A
            @0
            M=D
        """.trimIndent()
        ) shouldBe """
            0000000000000010
            1110110000010000
            0000000000000011
            1110000010010000
            0000000000000000
            1110001100001000
        """.trimIndent()
    }

    "MaxL" {
        assemble(
            """
            // This file is part of www.nand2tetris.org
            // and the book "The Elements of Computing Systems"
            // by Nisan and Schocken, MIT Press.
            // File name: projects/06/max/MaxL.asm

            // Symbol-less version of the Max.asm program.

            @0
            D=M
            @1
            D=D-M
            @12
            D;JGT
            @1
            D=M
            @2
            M=D
            @16
            0;JMP
            @0             
            D=M
            @2
            M=D
            @16
            0;JMP
        """.trimIndent()
        ) shouldBe """
            0000000000000000
            1111110000010000
            0000000000000001
            1111010011010000
            0000000000001100
            1110001100000001
            0000000000000001
            1111110000010000
            0000000000000010
            1110001100001000
            0000000000010000
            1110101010000111
            0000000000000000
            1111110000010000
            0000000000000010
            1110001100001000
            0000000000010000
            1110101010000111
        """.trimIndent()
    }

    "Max" {
        assemble(
            """
            // This file is part of www.nand2tetris.org
            // and the book "The Elements of Computing Systems"
            // by Nisan and Schocken, MIT Press.
            // File name: projects/06/max/Max.asm

            // Computes R2 = max(R0, R1)  (R0,R1,R2 refer to RAM[0],RAM[1],RAM[2])

               // D = R0 - R1
               @R0
               D=M
               @R1
               D=D-M
               // If (D > 0) goto ITSR0
               @ITSR0
               D;JGT
               // Its R1
               @R1
               D=M
               @R2
               M=D
               @END
               0;JMP
            (ITSR0)
               @R0             
               D=M
               @R2
               M=D
            (END)
               @END
               0;JMP
        """.trimIndent()
        ) shouldBe """
            0000000000000000
            1111110000010000
            0000000000000001
            1111010011010000
            0000000000001100
            1110001100000001
            0000000000000001
            1111110000010000
            0000000000000010
            1110001100001000
            0000000000010000
            1110101010000111
            0000000000000000
            1111110000010000
            0000000000000010
            1110001100001000
            0000000000010000
            1110101010000111
        """.trimIndent()
    }

    "Rect" {
        assemble(
            """
           // This file is part of www.nand2tetris.org
           // and the book "The Elements of Computing Systems"
           // by Nisan and Schocken, MIT Press.
           // File name: projects/06/rect/Rect.asm

           // Draws a rectangle at the top-left corner of the screen.
           // The rectangle is 16 pixels wide and R0 pixels high.

              // If (R0 <= 0) goto END else n = R0
              @R0
              D=M
              @END
              D;JLE 
              @n
              M=D
              // addr = base address of first screen row
              @SCREEN
              D=A
              @addr
              M=D
           (LOOP)
              // RAM[addr] = -1
              @addr
              A=M
              M=-1
              // addr = base address of next screen row
              @addr
              D=M
              @32
              D=D+A
              @addr
              M=D
              // decrements n and loops
              @n
              M=M-1
              D=M
              @LOOP
              D;JGT
           (END)
              @END
              0;JMP
       """.trimIndent()
        ) shouldBe """
            0000000000000000
            1111110000010000
            0000000000011000
            1110001100000110
            0000000000010000
            1110001100001000
            0100000000000000
            1110110000010000
            0000000000010001
            1110001100001000
            0000000000010001
            1111110000100000
            1110111010001000
            0000000000010001
            1111110000010000
            0000000000100000
            1110000010010000
            0000000000010001
            1110001100001000
            0000000000010000
            1111110010001000
            1111110000010000
            0000000000001010
            1110001100000001
            0000000000011000
            1110101010000111
        """.trimIndent()
    }
})
