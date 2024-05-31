export interface User {
    id: string;
    isAdmin: boolean;
}

declare module 'express' {
    export interface Request {
      user?: User
    }
  }

  declare module 'openai' {
    export namespace OpenAI {
        namespace Chat {
            namespace Completions {
                // Adjust according to actual requirements from OpenAI's type definitions
                interface ChatCompletionMessageParam {
                    role: string;
                    content: string;
                    name?: string;  // If 'name' is required by the SDK but you want it to be optional
                }
            }
        }
    }
}