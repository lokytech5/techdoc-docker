import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";


export class CloudStorageService {
    private blobServiceClient: BlobServiceClient;
    private containerClient: ContainerClient;

    constructor(connectionString: string, containerName: string) {
        if(!connectionString) {
            throw new Error('Azure Storage Connection String is not set');       
         }
            this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
            this.containerClient = this.blobServiceClient.getContainerClient(containerName);
            this.initializeContainer();
    }

    private async initializeContainer() {
        await this.containerClient. createIfNotExists({
            access: 'container',
        });
    }

    async uploadFile(fileBuffer: Buffer, fileName: string) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.upload(fileBuffer, fileBuffer.length);
        return blockBlobClient.url;
    }

}