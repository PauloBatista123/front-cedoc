import * as zod from "zod"

export const validationSchemaEndereco = zod.object({
  avenida: zod.string({ required_error: "O campo avenida não pode ser vazio." }).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  rua: zod.string({ required_error: "O campo rua não pode ser vazio." }).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  andar: zod.string({ required_error: "O campo andar não pode ser vazio." }).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  unidade_id: zod.number({ required_error: "Selecione a unidade." }),
});

export const validationSchemaEnderecamento = zod.object({
  numero: zod.string({ required_error: 'Informe o número do documento'}).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  espaco_ocupado: zod.string({ required_error: 'Informe o espaço ocupado pelo documento'}).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  predio_id: zod.string().optional()
})

export const validationSchemaNovoDocumento = zod.object({
  documento: zod.string({ required_error: 'Informe o número do documento'}).max(191, { message: "O campo pode conter no máxiom 191 caracteres" }).min(1, { message: "O campo pode conter no mínimo 1 caracteres" }),
  tipo_documento_id: zod.string({ required_error: "Selecione o tipo documental." }),
  cpf: zod.string({ required_error: 'Informe o número do cpf'}).max(11, { message: "O campo pode conter no máxiom 11 caracteres" }).min(11, { message: "O campo pode conter no mínimo 11 caracteres" }),
  nome: zod.string({ required_error: 'Informe o número do cpf'}).max(191, { message: "O campo pode conter no máxiom 11 caracteres" }).min(1, { message: "O campo pode conter no mínimo 11 caracteres" }),
  valor: zod.string().optional(),
  vencimento: zod.string().optional(),
})

export type newFormDataEnderecamentoSearch = zod.infer<typeof validationSchemaEnderecamento>;

export type newFormDataNovoDocumento = zod.infer<typeof validationSchemaNovoDocumento>;