import type { TimestamptzString } from "@prisma/orm-postgres/target/codec-types"
import { IsArray, IsDateString, IsIn, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from 'class-validator'

const CONTENT_TYPES = ['News', 'Photo', 'Video']
const CONTENT_STATUSES = ['draft', 'underReview', 'approved', 'rejected', 'published', 'hidden', 'expired']

export class CreateContentDto {
    @ValidateIf((o) => !!o.titleEn)
    @IsString()
    @MinLength(3)
    @MaxLength(150)
    titleEn?: string

    @ValidateIf((o) => !!o.titleAr)
    @IsString()
    @MinLength(3)
    @MaxLength(150)
    titleAr?: string

    @IsString()
    @IsIn(CONTENT_TYPES)
    type: string

    @IsString()
    @IsIn(CONTENT_STATUSES)
    status: string

    @IsArray()
    @IsString({ each: true })
    category: string[]

    @IsOptional()
    @IsDateString()
    publishDate?: TimestamptzString

    @IsOptional()
    @IsDateString()
    expiryDate?: TimestamptzString

    @ValidateIf((o) => !!o.bodyEn)
    @IsString()
    @MinLength(20)
    @MaxLength(5000)
    bodyEn?: string

    @ValidateIf((o) => !!o.bodyAr)
    @IsString()
    @MinLength(20)
    @MaxLength(5000)
    bodyAr?: string

    @IsOptional()
    @IsString()
    fileUrl?: string

    @ValidateIf((o) => !!o.rejectionReason)
    @IsString()
    @MinLength(10)
    @MaxLength(500)
    rejectionReason?: string

    @IsString()
    sender: string

    @IsDateString()
    sentDate: TimestamptzString
}
