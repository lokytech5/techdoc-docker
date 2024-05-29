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
          interface ChatCompletionMessageParam {
            role: string;
            content: string;
            name?: string;
          }
        }
      }
    }
  }