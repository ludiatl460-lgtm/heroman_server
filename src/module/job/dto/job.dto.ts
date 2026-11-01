import { IsString ,IsNotEmpty} from "class-validator";

export class JobDto {
    @IsString()
    @IsNotEmpty({message: "Job cannot be null"})
    name: string;
}