import { useParams } from 'next/navigation';
import { Button, DropdownMenu, Text, View } from 'reshaped';
import { Icon, MarkdownContent } from '@/components';
import { useCurrentInstitution, useQueryParams } from '@/hooks';
import { formatDurationInMonths } from '@/utils';
import { formatCourseName } from '@/utils/format-course-name';
import { CourseQuickInfo } from '../course-quick-info';
import type { CourseDetails } from '../types';
import { useQueryUnits } from './api/query';
import styles from './styles.module.scss';

export type CourseInfoProps = {
  course: CourseDetails;
  onViewCurriculum: () => void;
};

export const CourseInfo = ({ course, onViewCurriculum }: CourseInfoProps) => {
  const durationMonths = course.enrollment?.durationMonths;
  const { institutionSlug } = useCurrentInstitution();
  const { setParam } = useQueryParams();
  const { cidade: cityAndState } = useParams<{ cidade: string }>();
  const cityAndStateArray = cityAndState?.split('-');
  const state = cityAndStateArray?.[cityAndStateArray.length - 1].toLowerCase();

  const { data: units } = useQueryUnits({
    institution: institutionSlug,
    state,
    city: course.city as string,
    courseId: course.courseId || '',
  });

  const handleSwapUnit = (unitId: number) => {
    setParam('unit', String(unitId));
  };

  return (
    <View className={styles.info}>
      <View className={styles.header}>
        <View className={styles.titleSection}>
          <Text as="h1" variant="featured-1" className={styles.title}>
            {formatCourseName(course.name || '')}
          </Text>

          {course.description && (
            <View direction="row" justify="start">
              <MarkdownContent
                content={
                  course.description.length > 240
                    ? `${course.description.substring(0, 240)}... [Saiba mais](#sobre)`
                    : `${course.description}`
                }
              />
            </View>
          )}
        </View>
      </View>

      <View gap={4} direction="row" justify="space-between" align="center">
        <View gap={4} direction="row" align="center">
          {durationMonths && (
            <View className={styles.metaItem}>
              <Icon
                name="clock"
                size={18}
                aria-hidden="true"
                style={{ color: 'var(--rs-color-text-primary)' }}
              />
              <Text variant="body-3">
                {formatDurationInMonths(durationMonths)}
              </Text>
            </View>
          )}

          {course.city && (
            <View className={styles.metaItem}>
              <Icon
                name="map-pin"
                size={18}
                aria-hidden="true"
                style={{ color: 'var(--rs-color-text-primary)' }}
              />
              <Text variant="body-3">{course.city}</Text>
            </View>
          )}

          {course.enrollment?.modality !== 'Digital' && course.unit && (
            <View className={styles.metaItem}>
              <Icon
                name="building"
                size={18}
                aria-hidden="true"
                style={{ color: 'var(--rs-color-text-primary)' }}
              />
              <Text variant="body-3">{course.unit.name}</Text>
            </View>
          )}

          {units?.data && units.data.length > 1 && (
            <DropdownMenu position="bottom">
              <DropdownMenu.Trigger>
                {(attributes) => (
                  <Button
                    size="medium"
                    variant="outline"
                    endIcon={<Icon name="switch-vertical" size={16} />}
                    {...attributes}
                  >
                    Trocar Unidade
                  </Button>
                )}
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                {units?.data?.map((unit, index) => (
                  <DropdownMenu.Item
                    color="primary"
                    size="small"
                    key={unit.id || index}
                    onClick={() => {
                      handleSwapUnit(unit.id || 0);
                    }}
                  >
                    {unit.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu>
          )}
        </View>

        {course.curriculumGrid && (
          <Button
            onClick={onViewCurriculum}
            variant="outline"
            className={styles.curriculumButton}
            endIcon={<Icon name="calendar" size={16} />}
          >
            Visualizar grade curricular
          </Button>
        )}
      </View>

      <CourseQuickInfo campus={course.offerings?.[0]?.unit?.name} />
    </View>
  );
};
