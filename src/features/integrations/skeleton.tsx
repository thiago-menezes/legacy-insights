import { Grid, Skeleton, View } from 'reshaped';

export const IntegrationsSkeleton = () => {
  return (
    <View gap={4}>
      <View gap={4}>
        <Skeleton height="20px" width="70%" />
        <Skeleton height="40px" width="50%" />
        <Skeleton height="24px" width="30%" />
      </View>

      <View gap={4}>
        <Skeleton height="32px" width="30%" />
        <Skeleton height="36px" width="70%" />
      </View>

      <View gap={4}>
        <Skeleton height="32px" width="20%" />
        <Skeleton height="20px" width="50%" />
      </View>

      <Grid gap={4} columns="1fr 1fr">
        <Skeleton height="168px" width="100%" />
        <Skeleton height="168px" width="100%" />
      </Grid>

      <View gap={4}>
        <Skeleton height="32px" width="20%" />
        <Skeleton height="20px" width="50%" />
      </View>

      <Grid gap={4} columns="1fr 1fr">
        <Skeleton height="168px" width="100%" />
        <Skeleton height="168px" width="100%" />
      </Grid>

      <View gap={4}>
        <Skeleton height="32px" width="20%" />
        <Skeleton height="20px" width="50%" />
      </View>

      <Grid gap={4} columns="1fr 1fr">
        <Skeleton height="168px" width="100%" />
        <Skeleton height="168px" width="100%" />
      </Grid>
    </View>
  );
};
