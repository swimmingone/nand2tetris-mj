package kim.myeongjae.hackassembler

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe
import java.io.File

class PreprocessorKtTest : StringSpec({

    "Max.asm to MaxL.asm" {
        preprocess(
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
    }

    "Rect to RectL" {
        preprocess(
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
            @0
            D=M
            @24
            D;JLE
            @16
            M=D
            @16384
            D=A
            @17
            M=D
            @17
            A=M
            M=-1
            @17
            D=M
            @32
            D=D+A
            @17
            M=D
            @16
            M=M-1
            D=M
            @10
            D;JGT
            @24
            0;JMP
        """.trimIndent()
    }

    "Pong.asm to PongL.asm" {
        val input = File("src/test/resources/Pong.asm").readText()

        preprocess(input).trim() shouldBe File("src/test/resources/PongL.asm").readText()
            .replace("\r\n", System.lineSeparator()).trim()
    }
})
