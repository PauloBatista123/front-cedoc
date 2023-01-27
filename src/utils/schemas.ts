import * as zod from "zod"

export const validationSchemaEndereco = zod.object({
  avenida: zod.string({ required_error: "O campo avenida não pode ser vazio." }).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  rua: zod.string({ required_error: "O campo rua não pode ser vazio." }).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  andar: zod.string({ required_error: "O campo andar não pode ser vazio." }).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  unidade_id: zod.number({ required_error: "Selecione a unidade." }),
});
