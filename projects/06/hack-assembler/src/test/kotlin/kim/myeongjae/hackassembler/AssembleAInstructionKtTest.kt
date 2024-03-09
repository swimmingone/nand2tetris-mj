package kim.myeongjae.hackassembler

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class AssembleAInstructionKtTest : StringSpec({
    "@2" {
        assembleAInstruction("@2") shouldBe "0000000000000010"
    }

    "@3" {
        assembleAInstruction("@3") shouldBe "0000000000000011"
    }
})
