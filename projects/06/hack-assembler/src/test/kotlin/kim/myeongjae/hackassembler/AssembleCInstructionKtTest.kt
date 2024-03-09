package kim.myeongjae.hackassembler

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class AssembleCInstructionKtTest : StringSpec({

    "D=A" {
        assembleCInstruction("D=A") shouldBe "1110110000010000"
    }

    "D=D+A" {
        assembleCInstruction("D=D+A") shouldBe "1110000010010000"
    }

    "M=D" {
        assembleCInstruction("M=D") shouldBe "1110001100001000"
    }
})
