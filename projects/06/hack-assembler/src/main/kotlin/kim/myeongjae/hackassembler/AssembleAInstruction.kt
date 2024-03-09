package kim.myeongjae.hackassembler

fun assembleAInstruction(input: String): String {
    val binary = input.substring(1).toInt().toString(2)
    return "0".repeat(16 - binary.length) + binary
}
