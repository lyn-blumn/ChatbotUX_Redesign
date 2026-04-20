import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  DialogScrollArea,
  Button,
  Badge,
  Icon,
} from '@blumnai-studio/blumnai-design-system';

type NodeType = '안내' | '옵션' | '상담배정';

interface PreviewNode {
  name: string;
  type: NodeType;
}

interface WorkflowGroup {
  title: string;
  nodes: PreviewNode[];
}

const WORKFLOWS: WorkflowGroup[] = [
  {
    title: '오류 메시지 워크플로우',
    nodes: [{ name: '안내 1', type: '안내' }],
  },
  {
    title: '운영시간 작동(샘플) 워크플로우',
    nodes: [
      { name: '운영시간안내', type: '안내' },
      { name: '전송 성공 1', type: '안내' },
      { name: '전송 실패 1', type: '안내' },
      { name: '휴게시간 안내', type: '안내' },
      { name: '예약완료 안내', type: '안내' },
      { name: '옵션', type: '옵션' },
      { name: '옵션 13', type: '옵션' },
      { name: '통화실패 옵션', type: '옵션' },
      { name: '콜백예약완료 옵션', type: '옵션' },
      { name: '상담배정', type: '상담배정' },
    ],
  },
  {
    title: '운영시간 외 작동(샘플) 워크플로우',
    nodes: [
      { name: '진입멘트', type: '안내' },
      { name: '안내 1', type: '안내' },
      { name: '전송 성공', type: '안내' },
      { name: '전송 실패', type: '안내' },
    ],
  },
];

const GREEN_STRONG = 'var(--bg-basic-green-strong)';

type PreviewVariant = 'secondary' | 'soft';

function PlayIcon({ color }: { color: string }) {
  return <Icon iconType={['media', 'play']} isFill size={16} color={color} />;
}

function PreviewButton({ variant }: { variant: PreviewVariant }) {
  return (
    <Button
      buttonStyle={variant}
      size="sm"
      leadIcon={<PlayIcon color={GREEN_STRONG} />}
      style={{ color: GREEN_STRONG }}
    >
      미리듣기
    </Button>
  );
}

function WorkflowRow({ node, variant }: { node: PreviewNode; variant: PreviewVariant }) {
  return (
    <div className="flex items-center ds-gap-12 padding-y-8 padding-x-16">
      <div className="shrink-0">
        <Badge label={node.type} size="sm" color="neutral" />
      </div>
      <span className="flex-1 font-body size-sm font-normal text-default truncate">
        {node.name}
      </span>
      <div className="shrink-0">
        <PreviewButton variant={variant} />
      </div>
    </div>
  );
}

function variantForIndex(globalIdx: number): PreviewVariant {
  return globalIdx % 2 === 0 ? 'secondary' : 'soft';
}

function WorkflowGroupView({
  group,
  startIndex,
}: {
  group: WorkflowGroup;
  startIndex: number;
}) {
  const isHalfWidth = group.nodes.length <= 1;
  const totalPairs = Math.ceil(group.nodes.length / 2);

  return (
    <section className="flex flex-col ds-gap-8">
      <h4 className="font-body size-sm font-semibold text-subtle">{group.title}</h4>

      <div
        className="rounded-md overflow-hidden"
        style={{
          border: '1px solid var(--border-default)',
          width: isHalfWidth ? 'calc(50% - 8px)' : '100%',
        }}
      >
        {isHalfWidth ? (
          group.nodes.map((node, idx) => (
            <WorkflowRow
              key={`${node.name}-${idx}`}
              node={node}
              variant={variantForIndex(startIndex + idx)}
            />
          ))
        ) : (
          <div className="grid grid-cols-2">
            {group.nodes.map((node, idx) => {
              const isLeft = idx % 2 === 0;
              const pairIdx = Math.floor(idx / 2);
              const isLastRow = pairIdx === totalPairs - 1;
              return (
                <div
                  key={`${node.name}-${idx}`}
                  style={{
                    borderRight: isLeft ? '1px solid var(--border-default)' : undefined,
                    borderBottom: isLastRow ? undefined : '1px solid var(--border-default)',
                  }}
                >
                  <WorkflowRow node={node} variant={variantForIndex(startIndex + idx)} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export function VoicePreviewModal() {
  const totalNodes = WORKFLOWS.reduce((sum, g) => sum + g.nodes.length, 0);

  let running = 0;
  const groupsWithIndex = WORKFLOWS.map((group) => {
    const startIndex = running;
    running += group.nodes.length;
    return { group, startIndex };
  });

  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button buttonStyle="secondary">모달 열기</Button>
      </DialogTrigger>
      <DialogContent width={1000} hideCloseButton>
        <DialogHeader>
          <DialogTitle>ARS Flow Builder 미리듣기</DialogTitle>
        </DialogHeader>

        <DialogScrollArea maxHeight="calc(90vh - 180px)">
          <div className="flex flex-col ds-gap-32 padding-y-12">
            <section className="flex flex-col ds-gap-12">
              <div className="flex items-end justify-between ds-gap-12">
                <h3 className="font-body size-md font-semibold text-default">
                  미리듣기 생성 내용
                </h3>
                <p className="font-body size-sm line-height-leading-5 font-normal text-muted">
                  * 미리듣기 생성 완료되기까지 최대 3분의 시간이 소요될 수 있습니다.
                </p>
              </div>
              <div
                className="bg-subtle rounded-md padding-16 grid grid-cols-3 items-center font-body size-sm line-height-leading-5 font-normal text-subtle"
                style={{ border: '1px solid var(--border-default)' }}
              >
                <div className="flex flex-col ds-gap-2">
                  <span className="font-body size-xs text-muted">워크플로우</span>
                  <span className="font-body size-md font-semibold text-default">
                    {WORKFLOWS.length}개
                  </span>
                </div>
                <div
                  className="flex flex-col ds-gap-2"
                  style={{
                    borderLeft: '1px solid var(--border-default)',
                    borderRight: '1px solid var(--border-default)',
                    paddingLeft: 16,
                  }}
                >
                  <span className="font-body size-xs text-muted">생성 노드</span>
                  <span className="font-body size-md font-semibold text-default">
                    {totalNodes}개
                  </span>
                </div>
                <div className="flex flex-col ds-gap-2" style={{ paddingLeft: 16 }}>
                  <span className="font-body size-xs text-muted">수정된 글자수</span>
                  <span className="font-body size-md font-semibold text-default">
                    0자{' '}
                    <span className="font-body size-sm font-normal text-muted">
                      / 200,000자 가능
                    </span>
                  </span>
                </div>
              </div>
            </section>

            <section className="flex flex-col ds-gap-16">
              <div className="flex items-end justify-between ds-gap-12">
                <h3 className="font-body size-md font-semibold text-default">
                  음성멘트 생성 노드
                </h3>
                <p className="font-body size-sm line-height-leading-5 font-normal text-muted">
                  * 미리듣기 아이콘 클릭 시 미리듣기가 실행됩니다.(수정 글자 수 선차감)
                </p>
              </div>

              <div className="flex flex-col ds-gap-16">
                {groupsWithIndex.map(({ group, startIndex }) => (
                  <WorkflowGroupView
                    key={group.title}
                    group={group}
                    startIndex={startIndex}
                  />
                ))}
              </div>
            </section>
          </div>
        </DialogScrollArea>

        <DialogFooter>
          <DialogClose asChild>
            <Button buttonStyle="secondary">취소</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              buttonStyle="primary"
              className="btn-primary-black"
              leadIcon={<PlayIcon color="#ffffff" />}
            >
              미리듣기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default VoicePreviewModal;
