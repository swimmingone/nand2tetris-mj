package kim.myeongjae.hackassembler

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

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
})
