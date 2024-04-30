import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const role = await this.prisma.role.createMany({
        data: [
            { id: 'member' },
            { id: 'admin' }
        ]
    });

    const country = await this.prisma.country.createMany({
        data: [
            { id: 'vietnam' },
            { id: 'england' }
        ]
    });

    console.log({ role, country })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  // Not work yet, fix later