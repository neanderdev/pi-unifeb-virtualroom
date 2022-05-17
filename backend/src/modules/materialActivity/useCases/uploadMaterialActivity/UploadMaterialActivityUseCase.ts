import { prisma } from "../../../../database/prismaClient";

import { AppError } from "../../../../errors/AppError";

import { deleteFile } from "../../../../utils/file";

interface ILinks {
  name: string;
  link: string;
}

interface IFiles {
  filename: string;
  originalname: string;
  size: number;
}

interface IUploadMaterialActivity {
  activity_uid: string;
  materiais_name: IFiles[];
  links: ILinks[] | any;
}

export class UploadMaterialActivityUseCase {
  async execute({
    activity_uid,
    materiais_name,
    links,
  }: IUploadMaterialActivity) {
    const isExistsActivity = await prisma.activity.findFirst({
      where: {
        uid_activity: activity_uid,
      },
    });

    if (!isExistsActivity) {
      throw new AppError("Activity does not exists");
    }

    const isExistsMaterialActivity = await prisma.materialActivity.findMany({
      where: {
        activity_uid,
      },
    });

    if (isExistsMaterialActivity.length > 0) {
      isExistsMaterialActivity.map(
        async (material) =>
          material.tipo_material_activity === "M" &&
          (await deleteFile(`./tmp/${material.link_material_activity}`))
      );
    }

    await prisma.materialActivity.deleteMany({
      where: {
        activity_uid,
      },
    });

    materiais_name.map(async (file) => {
      if (file) {
        await prisma.materialActivity.create({
          data: {
            link_material_activity: `/materialActivity/${file.filename}`,
            name_material_activity: file.originalname,
            size_material_activity: file.size,
            tipo_material_activity: "M",
            activity_uid,
          },
        });
      }
    });

    links.map(async (link) => {
      if (JSON.parse(link)) {
        await prisma.materialActivity.create({
          data: {
            link_material_activity: JSON.parse(link).link,
            name_material_activity: JSON.parse(link).name,
            size_material_activity: 0,
            tipo_material_activity: "L",
            activity_uid,
          },
        });
      }
    });
  }
}
