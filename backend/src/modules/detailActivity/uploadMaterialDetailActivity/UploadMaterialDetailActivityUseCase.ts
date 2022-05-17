import { prisma } from "../../../database/prismaClient";

import { AppError } from "../../../errors/AppError";

import { deleteFile } from "../../../utils/file";

interface IFiles {
  filename: string;
  originalname: string;
  size: number;
}

interface IUploadMaterialDetailActivityUseCase {
  materialDetailActivity: IFiles[];
  detail_activity_id: number;
}

export class UploadMaterialDetailActivityUseCase {
  async execute({
    materialDetailActivity,
    detail_activity_id,
  }: IUploadMaterialDetailActivityUseCase) {
    const detailActivity = await prisma.detailActivity.findFirst({
      where: {
        id_detail_activity: detail_activity_id,
      },
    });

    if (!detailActivity) {
      throw new AppError("Detail Activity does not exists");
    }

    const isExistsMaterialDetailActivity =
      await prisma.materialDetailActivity.findMany({
        where: {
          detail_activity_id,
        },
      });

    if (isExistsMaterialDetailActivity.length > 0) {
      isExistsMaterialDetailActivity.map(
        async (detailActivity) =>
          await deleteFile(
            `./tmp/${detailActivity.link_material_detail_activity}`
          )
      );
    }

    await prisma.materialDetailActivity.deleteMany({
      where: {
        detail_activity_id,
      },
    });

    materialDetailActivity.map(async (detailActivity) => {
      if (detailActivity) {
        await prisma.materialDetailActivity.create({
          data: {
            link_material_detail_activity: `/materialDetailActivity/${detailActivity.filename}`,
            name_material_detail_activity: detailActivity.originalname,
            size_material_detail_activity: detailActivity.size,
            detail_activity_id,
          },
        });
      }
    });
  }
}
