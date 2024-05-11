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

    const tag = await this.prisma.tag.createMany({
      data: [
        { id: 'spring', order: 1, colorCode: 'green'},
        { id: 'summer', order: 2, colorCode: 'yellow'},
        { id: 'autumn', order: 3, colorCode: 'orange'},
        { id: 'winter', order: 4, colorCode: 'white'},
        { id: 'sea', order: 5, colorCode: 'blue'},
        { id: 'mountain', order: 6, colorCode: 'gray'},
        { id: 'island', order: 7, colorCode: 'purple'},
      ]
    })

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