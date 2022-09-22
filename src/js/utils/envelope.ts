import {
  BaseEnvelopeHeaders,
  DsnComponents,
  EventEnvelope,
  EventEnvelopeHeaders,
  SdkMetadata,
  UserFeedback,
  UserFeedbackItem,
} from '@sentry/types';
import { createEnvelope, dsnToString } from '@sentry/utils';

/**
 * Creates an envelope from a user feedback.
 */
export function createUserFeedbackEnvelope(
  feedback: UserFeedback,
  {
    metadata,
    tunnel,
    dsn,
  }: {
    metadata: SdkMetadata | undefined,
    tunnel: string | undefined,
    dsn: DsnComponents | undefined,
  },
): EventEnvelope {
  // TODO: Use EventEnvelope[0] when JS sdk fix is released
  const headers: EventEnvelopeHeaders & BaseEnvelopeHeaders = {
    event_id: feedback.event_id,
    sent_at: new Date().toISOString(),
    ...(metadata && metadata.sdk && { sdk: metadata.sdk }),
    ...(!!tunnel && !!dsn && { dsn: dsnToString(dsn) }),
  };
  const item = createUserFeedbackEnvelopeItem(feedback);

  return createEnvelope(headers, [item]);
}

function createUserFeedbackEnvelopeItem(
  feedback: UserFeedback
): UserFeedbackItem {
  const feedbackHeaders: UserFeedbackItem[0] = {
    type: 'user_report',
  };
  return [feedbackHeaders, feedback];
}
