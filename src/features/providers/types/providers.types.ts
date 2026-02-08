import type { z } from "zod";
import type { AllProvidersSchema, ProviderSchema } from "../schemas/providers.schema";

export type Provider = z.infer<typeof ProviderSchema>;
export type AllProviders = z.infer<typeof AllProvidersSchema>;

export type CreateProviderDto = Omit<Provider, "po_id">;
export type UpdateProviderDto = Partial<CreateProviderDto> & { po_id: string };
