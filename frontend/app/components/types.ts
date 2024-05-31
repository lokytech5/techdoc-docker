export interface LoginUserData{
  username: string;
  password: string;
}
  
  export interface LoginUserResponse {
    token: string;
    username: string;
    _id: string;
    email: string;
  }

  export interface RegisterUserData {
    username: string;
    password: string;
    email: string;
  }
  
  export interface RegisterUserResponse {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
  }

  export interface ProjectData{
    id: string;
    userId: string;
    name: string;
    repository_url: string;
    description: string;
    technicalStack: string;
    created_at: string;
    updated_at: string;
  }

  export interface ProjectResponse {
    message: string;
    project: ProjectData;
  }

  export interface ProjectFormData {
    name: string;
    repository_url: string;
    description: string;
    technicalStack: string;
}



 export interface GuideResponse {
    id: string;
    projectId: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
  }

 export interface CodeAnalysisData {
    code: string;

  }

 export interface CodeAnalysisResponse {
    savedAnalysis: {
      id: string;
      code: string;
      openAIAnalysis: string;
      eslintAnalysis: string;
      created_at: string;
      updated_at: string;
    }
  }

  