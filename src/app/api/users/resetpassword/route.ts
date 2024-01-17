import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;
    // console.log(token, newPassword);
    
    const salt = await bcryptjs.genSalt(10);
    const newHashedPassword = await bcryptjs.hash(newPassword, salt);
    // console.log(newHashedPassword);
    const user = await User.findOneAndUpdate(
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      },
      {
        $set: {
          password: newHashedPassword,
          isVerfied: true,
          forgotPasswordToken: undefined,
          forgotPasswordTokenExpiry: undefined,
        },
      },
      { new: true } // This ensures that the updated document is returned
    );
    // console.log(user.isVerfied)

    if (!user) {
      return NextResponse.json({ error: "User does not exist or token expired" }, { status: 400 });
    }

    // console.log(user);

    return NextResponse.json({
      message: "Password Updated Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
