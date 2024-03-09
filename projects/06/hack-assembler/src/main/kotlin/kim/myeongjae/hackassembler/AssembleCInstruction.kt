package kim.myeongjae.hackassembler

fun assembleCInstruction(input: String): String {
    // =가 생략된 경우 -> comp만 있다.
    // ;가 생략된 경우, 아닌 경우

    val dest = when {
        input.contains("=") -> input.substringBefore("=")
        else -> ""
    }

    val comp = when {
        input.contains("=") -> input.substringAfter("=").substringBefore(";")
        input.contains(";") -> input.substringBefore(";")
        else -> input
    }

    val jump = when {
        input.contains(";") -> input.substringAfter(";")
        else -> ""
    }

    val destBinary = when (dest) {
        "" -> "000"
        "M" -> "001"
        "D" -> "010"
        "MD" -> "011"
        "A" -> "100"
        "AM" -> "101"
        "AD" -> "110"
        "AMD" -> "111"
        else -> throw IllegalArgumentException("Invalid dest: $dest")
    }

    val compBinary = when (comp) {
        "0" -> "0101010"
        "1" -> "0111111"
        "-1" -> "0111010"
        "D" -> "0001100"
        "A" -> "0110000"
        "!D" -> "0001101"
        "!A" -> "0110001"
        "-D" -> "0001111"
        "-A" -> "0110011"
        "D+1" -> "0011111"
        "A+1" -> "0110111"
        "D-1" -> "0001110"
        "A-1" -> "0110010"
        "D+A" -> "0000010"
        "D-A" -> "0010011"
        "A-D" -> "0000111"
        "D&A" -> "0000000"
        "D|A" -> "0010101"
        "M" -> "1110000"
        "!M" -> "1110001"
        "-M" -> "1110011"
        "M+1" -> "1110111"
        "M-1" -> "1110010"
        "D+M" -> "1000010"
        "D-M" -> "1010011"
        "M-D" -> "1000111"
        "D&M" -> "1000000"
        "D|M" -> "1010101"
        else -> throw IllegalArgumentException("Invalid comp: $comp")
    }

    val jumpBinary = when (jump) {
        "" -> "000"
        "JGT" -> "001"
        "JEQ" -> "010"
        "JGE" -> "011"
        "JLT" -> "100"
        "JNE" -> "101"
        "JLE" -> "110"
        "JMP" -> "111"
        else -> throw IllegalArgumentException("Invalid jump: $jump")
    }

    return "111$compBinary$destBinary$jumpBinary"
}
