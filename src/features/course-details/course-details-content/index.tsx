import { View } from 'reshaped';
import { Breadcrumb, FAQSection } from '@/components';
import { InfrastructureSection } from '@/features/infrastructure';
import { CourseAbout } from '../course-about';
import { CourseAdmissionForms } from '../course-admission-forms';
import { CourseCoordination } from '../course-coordination';
import { CourseEnrollmentSidebar } from '../course-enrollment-sidebar';
import { CourseImage } from '../course-image';
import { CourseInfo } from '../course-info';
import { CourseModalitySelector } from '../course-modality-selector';
import { CourseShiftSelector } from '../course-shift-selector';
import { CourseTextSection } from '../course-text-section';
import { CourseVideo } from '../course-video';
import { CurriculumGridModal } from '../curriculum-grid-modal';
import { MobileFooterBar } from '../mobile-footer-bar';
import { PaymentMethodSelector } from '../payment-method-selector';
import type { CourseDetails } from '../types';
import { useCourseDetailsContent } from './hooks';
import styles from './styles.module.scss';

export const CourseDetailsContent = ({ course }: { course: CourseDetails }) => {
  const {
    breadcrumbItems,
    isCurriculumModalOpen,
    handleOpenCurriculumModal,
    handleCloseCurriculumModal,
    selectedModalityId,
    selectedUnitId,
    selectedShiftName,
    selectedAdmissionFormCode,
    setSelectedShiftName,
    setSelectedAdmissionFormCode,
    setSelectedModalityId,
    paymentMethods,
  } = useCourseDetailsContent(course);

  return (
    <section>
      <View className={styles.content}>
        <div className={styles.layout}>
          <View className={styles.mainSection}>
            <header className={styles.header}>
              <Breadcrumb items={breadcrumbItems} />
              <CourseImage course={course} />
              <CourseInfo
                course={course}
                onViewCurriculum={handleOpenCurriculumModal}
              />
              {/* TODO: Discovery how to handle multiple modalities */}
              <CourseModalitySelector
                modalities={[
                  {
                    id: 1,
                    name: course.enrollment?.modality || '',
                    slug: course.enrollment?.modality || '',
                  },
                ]}
                onSelectModality={setSelectedModalityId}
                selectedModalityId={selectedModalityId}
              />

              {!!course.enrollment?.shifts && (
                <>
                  <CourseShiftSelector
                    shifts={course.enrollment.shifts}
                    selectedShiftName={selectedShiftName}
                    onSelectShift={setSelectedShiftName}
                  />
                  <CourseAdmissionForms
                    availableForms={
                      course.enrollment.shifts.find(
                        (s) => s.name === selectedShiftName,
                      )?.admissionForms || []
                    }
                    selectedFormId={selectedAdmissionFormCode}
                    onSelectForm={setSelectedAdmissionFormCode}
                  />
                </>
              )}
            </header>

            {paymentMethods.length > 0 && (
              <PaymentMethodSelector paymentMethods={paymentMethods} />
            )}

            {!!course.description && (
              <CourseAbout description={course.description} />
            )}
            {!!course.methodology && (
              <CourseTextSection
                title="Metodologia"
                content={course.methodology}
              />
            )}
            {!!course.certificate && (
              <CourseTextSection
                title="Certificado"
                content={course.certificate}
              />
            )}
            {!!course.videoUrl && <CourseVideo videoUrl={course.videoUrl} />}

            <CourseCoordination course={course} />
          </View>

          <CourseEnrollmentSidebar
            course={course}
            selectedModalityId={selectedModalityId}
            selectedUnitId={selectedUnitId}
            selectedShiftName={selectedShiftName}
            selectedAdmissionFormCode={selectedAdmissionFormCode}
          />
        </div>

        <CurriculumGridModal
          isOpen={isCurriculumModalOpen}
          onClose={handleCloseCurriculumModal}
          course={course}
        />
      </View>

      <InfrastructureSection
        courseId={course.courseId || ''}
        fixedUnitId={selectedUnitId || undefined}
      />

      {course.faqs && course.faqs.length > 0 && (
        <FAQSection
          items={course.faqs.map((f) => ({
            question: f.question || '',
            answer: f.answer || '',
          }))}
          showDivider={false}
        />
      )}

      <MobileFooterBar />
    </section>
  );
};
