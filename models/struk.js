class Struk {
    constructor(
        id,
        fromCache,
        namaKaryawan,
        midstatus,
        midId,
        tanggal,
        pelanggan,
        tipePembayaran,
        itemCards) {
        this.id = id,
            this.fromCache = fromCache,
            this.namaKaryawan = namaKaryawan,
            this.midstatus = midstatus,
            this.midId = midId,
            this.tanggal = tanggal,
            this.pelanggan = pelanggan,
            this.tipePembayaran = tipePembayaran,
            this.itemCards = itemCards
    }
}

module.exports = Struk;