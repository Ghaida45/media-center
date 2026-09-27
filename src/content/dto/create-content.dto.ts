import { TimestamptzString } from "@prisma/orm-postgres/target/codec-types"

export class CreateContentDto {
    titleEn: string
    titleAr: string
    type: string
    status: string
    category: string[]
    date: TimestamptzString
    expiryDate?: TimestamptzString
    bodyEn: string
    bodyAr: string
    rejectionReason?: string
    sender: string
    sentDate: TimestamptzString
}
