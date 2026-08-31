import { getDbPool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const pool = getDbPool();
        if (!pool) {
            return NextResponse.json(
                { success: false, error: 'Database is not configured. Please set DATABASE_URL or POSTGRES_URL.' },
                { status: 503 }
            );
        }
        const result = await pool.query('SELECT NOW()');
        return NextResponse.json({ success: true, time: result.rows[0] });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}