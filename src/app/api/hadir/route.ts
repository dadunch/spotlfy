// api/hadir/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID harus diisi" }, { status: 400 });
    }

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, auth);
    await doc.loadInfo();

    const sheet = doc.sheetsById[0];
    await sheet.loadCells(); // Load semua cells
    
    const rows = await sheet.getRows();
    
    // Cari row berdasarkan ID (asumsi kolom pertama adalah ID)
    const targetRow = rows.find(row => row.get('Id Email') === id.toString());
    
    if (!targetRow) {
      return NextResponse.json({ error: "Data dengan ID tersebut tidak ditemukan" }, { status: 404 });
    }

    // Update kolom status menjadi '1'
    targetRow.set('status', '1');
    await targetRow.save();

    return NextResponse.json({ 
      success: true, 
      message: "Status berhasil diupdate" 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}