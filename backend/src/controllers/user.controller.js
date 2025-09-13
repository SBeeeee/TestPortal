import { registerUser, loginUser, getUserById } from "../services/user.services.js"


export const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Registration failed",
    });
  }
};


export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);

    res
      .cookie(process.env.COOKIE_NAME || "authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: user,
        token,
      });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message || "Invalid credentials",
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.id); 
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};


export const logout = (req, res) => {
  res
    .clearCookie(process.env.COOKIE_NAME || "authToken")
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
