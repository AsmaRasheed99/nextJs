import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({
      email,
    });
    if (!user) {
        return NextResponse.json({ error: "User Does Not Exist" }, { status: 404 });
    }
    if(!user.isVerfied) {
        return NextResponse.json({ error: "Email Needs Verification" }, { status: 400 });
  
      }
  
    // console.log(user);

    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Reset Link has been Sent",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
