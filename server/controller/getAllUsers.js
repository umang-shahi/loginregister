const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true, // This value must be defined in the Role enum
      },
    }
    
    );
    
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


module.exports = getAllUsers;
