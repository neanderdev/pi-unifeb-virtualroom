import React from 'react';
import { Linking } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { formatterDate } from '../../utils/formatterDate';

import { IResponseActivityByUid } from '../../dtos/ActivityByUidDTO';
import { IResponseDetailActivityByUserUid } from '../../dtos/DetailActivityDTO';

import {
    Container,
    HeaderActivity,
    TitleHeaderActivity,
    Detail,
    PointHeaderActivity,
    DateHeaderActivity,
    DescriptionActivity,
    TitleAttachment,
    AttachmentContent,
    AttachmentButton,
    Attachment,
    AttachmentIcon,
    AttachmentImage,
    AttachmentName,
    AttachmentSize,
    MaterialActivityList,
    Separator,
} from './styles';

interface Props {
    dataActivity: IResponseActivityByUid;
    dataDetailActivity: IResponseDetailActivityByUserUid | null;
}

export function ActivityUid({ dataActivity, dataDetailActivity }: Props) {
    return (
        <Container>
            <HeaderActivity>
                <TitleHeaderActivity>
                    {dataActivity.name_activity}
                </TitleHeaderActivity>

                <Detail>
                    {dataActivity.category_activity.tipo_category_activity === 'A' && (
                        <PointHeaderActivity>
                            {dataDetailActivity?.nota_user ?? 0} / {dataActivity.nota_max_activity}
                        </PointHeaderActivity>
                    )}

                    <DateHeaderActivity>
                        {dataActivity.category_activity.tipo_category_activity === 'A'
                            ? `Data de entrega: ${formatterDate(dataActivity.dt_entrega_activity)}`
                            : `Data de publicação: ${formatterDate(dataActivity.createdAt_activity)}`
                        }
                    </DateHeaderActivity>
                </Detail>
            </HeaderActivity>

            <Separator />

            <DescriptionActivity>
                {dataActivity.content_activity}
            </DescriptionActivity>

            <Separator />

            <TitleAttachment>
                Anexos
            </TitleAttachment>

            <Separator />

            {dataActivity.MaterialActivity.length > 0 && (
                <MaterialActivityList
                    data={dataActivity.MaterialActivity}
                    keyExtractor={item => String(item.id_material_activity)}
                    renderItem={({ item }) => (
                        item.tipo_material_activity === 'L'
                            ? (
                                <AttachmentContent>
                                    <AttachmentButton onPress={() => Linking.openURL(item.link_material_activity)}>
                                        <Attachment>
                                            <AttachmentIcon>
                                                <AntDesign
                                                    name="link"
                                                    size={40}
                                                    color="#000"
                                                />
                                            </AttachmentIcon>
                                        </Attachment>

                                        <AttachmentName>
                                            {item.name_material_activity}
                                        </AttachmentName>
                                    </AttachmentButton>
                                </AttachmentContent>
                            )
                            : (
                                ["jpg", "jpeg", "png"].includes(item.link_material_activity.replace(/^.*\./, ''))
                                    ? (
                                        <AttachmentContent>
                                            <Attachment>
                                                <AttachmentImage
                                                    source={{ uri: 'https://lh3.googleusercontent.com/C_Ty0alIJNrRQz5pNFmgA1rsRnhZDj67eVCCHXoJFFot0FQEZydARPRKbBADyHQoA0_Dj6gLITCshiJq6C-H-QM_U2mJwJZVLOQPnwvCL2RerGMEhw0' }}
                                                    resizeMode="cover"
                                                />
                                            </Attachment>

                                            <AttachmentName>
                                                {item.name_material_activity}
                                            </AttachmentName>

                                            <AttachmentSize>
                                                {item.size_material_activity / 1000} KB
                                            </AttachmentSize>
                                        </AttachmentContent>
                                    )
                                    : ["doc", "docx"].includes(item.link_material_activity.replace(/^.*\./, ''))
                                        ? (
                                            <AttachmentContent>
                                                <Attachment>
                                                    <AttachmentIcon>
                                                        <AntDesign
                                                            name="wordfile1"
                                                            size={40}
                                                            color="#000"
                                                        />
                                                    </AttachmentIcon>
                                                </Attachment>

                                                <AttachmentName>
                                                    {item.name_material_activity}
                                                </AttachmentName>

                                                <AttachmentSize>
                                                    {item.size_material_activity / 1000} KB
                                                </AttachmentSize>
                                            </AttachmentContent>
                                        )
                                        : ["zip", "rar"].includes(item.link_material_activity.replace(/^.*\./, ''))
                                            ? (
                                                <AttachmentContent>
                                                    <Attachment>
                                                        <AttachmentIcon>
                                                            <FontAwesome
                                                                name="file-zip-o"
                                                                size={40}
                                                                color="#000"
                                                            />
                                                        </AttachmentIcon>
                                                    </Attachment>

                                                    <AttachmentName>
                                                        {item.name_material_activity}
                                                    </AttachmentName>

                                                    <AttachmentSize>
                                                        {item.size_material_activity / 1000} KB
                                                    </AttachmentSize>
                                                </AttachmentContent>
                                            )
                                            : (
                                                <AttachmentContent>
                                                    <Attachment>
                                                        <AttachmentIcon>
                                                            <AntDesign
                                                                name="pdffile1"
                                                                size={40}
                                                                color="#000"
                                                            />
                                                        </AttachmentIcon>
                                                    </Attachment>

                                                    <AttachmentName>
                                                        {item.name_material_activity}
                                                    </AttachmentName>

                                                    <AttachmentSize>
                                                        {item.size_material_activity / 1000} KB
                                                    </AttachmentSize>
                                                </AttachmentContent>
                                            )
                            )
                    )}
                    ItemSeparatorComponent={() => <Separator />}
                />
            )}
        </Container>
    );
}