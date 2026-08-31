import { NextResponse } from "next/server";

// Default admin PIN code. Can also be set in environment variables (ADMIN_PIN)
const ADMIN_PIN = process.env.ADMIN_PIN || "konig2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (!pin) {
      return NextResponse.json(
        { success: false, message: "Code PIN requis" },
        { status: 400 }
      );
    }

    if (pin === ADMIN_PIN) {
      return NextResponse.json({
        success: true,
        message: "Authentification réussie",
        token: "admin_session_" + Buffer.from(pin).toString("base64"),
      });
    }

    return NextResponse.json(
      { success: false, message: "Code PIN incorrect" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    );
  }
}
