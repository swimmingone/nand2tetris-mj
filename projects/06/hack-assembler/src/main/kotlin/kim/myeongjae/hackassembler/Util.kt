package kim.myeongjae.hackassembler

fun String.isAInstruction(): Boolean {
    return this.startsWith("@")
}
