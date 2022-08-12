export default {
  getUserByEmail: async (email: string) => {
    const user = await prisma?.user.findFirst({
      where: {
        email
      }
    })

    if(user) {
      return user;
    }

    return null;
  }
}