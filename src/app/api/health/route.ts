import {NextResponse} from "next/server";
export function GET(){return NextResponse.json({service:"radonik",status:"ok",checkout:"legacy-woocommerce",database:"neon-postgres"},{headers:{"Cache-Control":"no-store"}});}
