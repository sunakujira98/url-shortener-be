// https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient()

export default prisma
