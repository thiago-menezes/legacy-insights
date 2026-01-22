import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Tabs, Text, View } from 'reshaped';
import { Icon, MarkdownContent } from '@/components';
import type { CourseDetails } from '../types';
import { filterTeachersByModality } from '../utils';
import {
  useQueryCourseCoordination,
  useQueryCourseTeachers,
} from './api/query';
import styles from './styles.module.scss';

export type CourseCoordinationProps = {
  course: CourseDetails;
  selectedModalityId?: number | null;
};

export function CourseCoordination({
  course,
  selectedModalityId,
}: CourseCoordinationProps) {
  const [activeTab, setActiveTab] = useState<'coordination' | 'pedagogical'>(
    'coordination',
  );

  const { data: coordinator } = useQueryCourseCoordination(
    String(course?.enrollment?.courseId),
  );

  const { data: fetchedTeachers } = useQueryCourseTeachers(
    String(course?.enrollment?.courseId),
  );

  const teachers = filterTeachersByModality(
    fetchedTeachers,
    selectedModalityId || null,
  );
  const hasCoordinationData = !!coordinator || teachers.length > 0;
  const pedagogicalProject = course.pedagogicalProject;

  if (!hasCoordinationData && !pedagogicalProject) {
    return <></>;
  }

  return (
    <View className={styles.coordination}>
      <Tabs
        onChange={(args) =>
          setActiveTab(args.value as 'coordination' | 'pedagogical')
        }
        variant="borderless"
        defaultValue="coordination"
      >
        <Tabs.List>
          <Tabs.Item value="coordination" icon={<Icon name="user" />}>
            Coordenação e Docentes
          </Tabs.Item>

          <Tabs.Item value="pedagogical" icon={<Icon name="book" />}>
            Projeto pedagógico
          </Tabs.Item>
        </Tabs.List>
      </Tabs>

      <View className={styles.tabContent}>
        {activeTab === 'coordination' && (
          <View className={styles.coordinatorContent}>
            {hasCoordinationData ? (
              <>
                {coordinator && (
                  <View key="coordinator" className={styles.coordinatorCard}>
                    {coordinator.photo ? (
                      <Image
                        src={coordinator.photo}
                        alt={`Foto do coordenador(a) ${coordinator.name}`}
                        className={styles.coordinatorPhoto}
                        width={120}
                        height={120}
                      />
                    ) : (
                      <View className={styles.coordinatorPhotoPlaceholder}>
                        <Icon name="user" size={64} />
                      </View>
                    )}
                    <View className={styles.coordinatorInfo}>
                      <Text as="h3" variant="body-2" weight="bold">
                        {coordinator.name}
                      </Text>
                      <Text
                        variant="body-3"
                        color="neutral-faded"
                        className={styles.coordinatorDescription}
                      >
                        {coordinator.description}
                      </Text>

                      <View gap={2} direction="row">
                        {coordinator.phone && (
                          <Link href={`tel:${coordinator.phone}`}>
                            <Button
                              variant="faded"
                              color="primary"
                              size="small"
                              icon={<Icon name="phone" />}
                            >
                              Contate a coordenação
                            </Button>
                          </Link>
                        )}

                        {coordinator.whatsapp && (
                          <Link
                            href={`https://wa.me/55${coordinator.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            passHref
                          >
                            <Button
                              variant="faded"
                              color="primary"
                              size="small"
                              icon={<Icon name="brand-whatsapp" />}
                            >
                              Falar no WhatsApp
                            </Button>
                          </Link>
                        )}
                      </View>
                    </View>
                  </View>
                )}

                {teachers.length > 0 && (
                  <View key="teachers" className={styles.teachersContent}>
                    <Text
                      as="h3"
                      variant="featured-2"
                      weight="bold"
                      className={styles.teachersTitle}
                    >
                      Corpo docente
                    </Text>
                    <View className={styles.teachersList}>
                      {teachers.map((teacher) => (
                        <View key={teacher.id} className={styles.teacherRow}>
                          <Text
                            as="h4"
                            variant="body-3"
                            weight="bold"
                            className={styles.teacherName}
                          >
                            {teacher.name}
                          </Text>
                          <Text
                            variant="body-3"
                            color="neutral-faded"
                            className={styles.teacherRole}
                          >
                            {teacher.role}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </>
            ) : (
              <View className={styles.emptyState}>
                <Text variant="body-2" color="neutral-faded">
                  Informações sobre coordenação e corpo docente não estão
                  disponíveis no momento.
                </Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'pedagogical' && (
          <View className={styles.pedagogicalContent}>
            {pedagogicalProject ? (
              <MarkdownContent content={pedagogicalProject} />
            ) : (
              <View className={styles.emptyState}>
                <Text variant="body-2" color="neutral-faded">
                  Informações sobre o projeto pedagógico não estão disponíveis
                  no momento.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
