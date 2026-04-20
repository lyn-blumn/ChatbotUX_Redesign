import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  Button,
  Radio,
  RadioGroup,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Icon,
} from '@blumnai-studio/blumnai-design-system';

type TabKey = 'recommended' | 'female' | 'male' | 'child';

const VOICE_OPTIONS: Record<TabKey, { value: string; label: string }[]> = {
  recommended: [
    { value: 'yejin', label: '예진(여)' },
    { value: 'yujin', label: '유진(여)' },
    { value: 'jiyoon', label: '지윤(여)' },
    { value: 'ara-counselor', label: '아라(상담사)(여)' },
    { value: 'ara-angry', label: '아라(화남)(여)' },
    { value: 'ara', label: '아라(여)' },
    { value: 'gihyo', label: '기효(남)' },
    { value: 'sinwoo', label: '신우(남)' },
    { value: 'juan', label: '주안(남)' },
    { value: 'giram', label: '기람(아동)' },
  ],
  female: [
    { value: 'yejin', label: '예진(여)' },
    { value: 'yujin', label: '유진(여)' },
    { value: 'jiyoon', label: '지윤(여)' },
    { value: 'ara-counselor', label: '아라(상담사)(여)' },
    { value: 'ara-angry', label: '아라(화남)(여)' },
    { value: 'ara', label: '아라(여)' },
  ],
  male: [
    { value: 'gihyo', label: '기효(남)' },
    { value: 'sinwoo', label: '신우(남)' },
    { value: 'juan', label: '주안(남)' },
  ],
  child: [{ value: 'giram', label: '기람(아동)' }],
};

const SPEED_OPTIONS = [
  { value: 'slow', label: '느림' },
  { value: 'normal', label: '보통' },
  { value: 'fast', label: '빠름' },
  { value: 'very-fast', label: '아주빠름' },
];

const PITCH_OPTIONS = [
  { value: 'low', label: '낮음' },
  { value: 'normal', label: '보통' },
  { value: 'high', label: '높음' },
];

export function VoiceSettingsModal() {
  const [activeTab, setActiveTab] = useState<TabKey>('recommended');
  const [voice, setVoice] = useState('ara-counselor');
  const [speed, setSpeed] = useState('normal');
  const [pitch, setPitch] = useState('high');

  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button buttonStyle="secondary">모달 열기</Button>
      </DialogTrigger>
      <DialogContent width={1000} hideCloseButton>
        <DialogHeader>
          <DialogTitle>
            <span className="inline-flex items-center ds-gap-6">
              프리미엄 상담 보이스 설정
              <Icon iconType={['system', 'information']} size={16} color="var(--icon-default-muted)" />
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col ds-gap-24 padding-y-8">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
            <TabsList variant="underline" size="sm" gap={16} activeColor="#111115" className="w-full">
              <TabsTrigger value="recommended">추천</TabsTrigger>
              <TabsTrigger value="female">여성</TabsTrigger>
              <TabsTrigger value="male">남성</TabsTrigger>
              <TabsTrigger value="child">아동</TabsTrigger>
            </TabsList>

            {(Object.keys(VOICE_OPTIONS) as TabKey[]).map((key) => (
              <TabsContent key={key} value={key}>
                <section className="flex flex-col ds-gap-12 padding-t-16">
                  <h3 className="font-body size-md font-semibold text-default">프리미엄 보이스 선택</h3>
                  <RadioGroup
                    value={voice}
                    onValueChange={setVoice}
                    className="grid grid-cols-5 ds-gap-x-16 ds-gap-y-12 content-start"
                    style={{ minHeight: 60 }}
                  >
                    {VOICE_OPTIONS[key].map((opt) => (
                      <Radio key={opt.value} value={opt.value} label={opt.label} />
                    ))}
                  </RadioGroup>
                </section>
              </TabsContent>
            ))}
          </Tabs>

          <section className="flex flex-col ds-gap-12">
            <h3 className="font-body size-md font-semibold text-default">보이스 속도</h3>
            <RadioGroup value={speed} onValueChange={setSpeed} className="grid grid-cols-5 ds-gap-x-16 ds-gap-y-12">
              {SPEED_OPTIONS.map((opt) => (
                <Radio key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </RadioGroup>
          </section>

          <section className="flex flex-col ds-gap-12">
            <h3 className="font-body size-md font-semibold text-default">음성 피치</h3>
            <RadioGroup value={pitch} onValueChange={setPitch} className="grid grid-cols-5 ds-gap-x-16 ds-gap-y-12">
              {PITCH_OPTIONS.map((opt) => (
                <Radio key={opt.value} value={opt.value} label={opt.label} />
              ))}
            </RadioGroup>
          </section>

          <div>
            <Button buttonStyle="secondary" size="sm" leadIcon={['media', 'play-circle', true]}>
              보이스 듣기
            </Button>
          </div>

          <div className="flex flex-col ds-gap-8">
            <div className="bg-subtle rounded-md padding-16 flex flex-col ds-gap-4 font-body size-sm line-height-leading-5 font-normal text-subtle">
              <p className="text-default">
                샘플 보이스 문구 (특수기호가 들어간 자리를 자세히 들어주세요.)
              </p>
              <p>고객을 놓치지 않는 똑똑한 ARS. 콜브릿지입니다!</p>
              <p>대기 시간 없는 빠른 카톡 상담을 원하시면 0번, 상담사 연결은 1번을 눌러주세요?</p>
              <p className="text-muted">※ 특수기호 : 띄어쓰기, 물음표(?), 쉼표(,), 느낌표(!), 마침표(.)</p>
            </div>

            <div className="bg-subtle rounded-md padding-16 font-body size-sm line-height-leading-5 font-normal text-subtle">
              <ul className="flex flex-col ds-gap-4 list-disc padding-l-12">
                <li>
                  변경된 보이스를 빌더에 적용 하려면{' '}
                  <strong className="font-semibold text-default">[저장하기]</strong> 버튼을 클릭해 주세요.
                </li>
                <li>
                  보이스를 변경하고 빌더 우측 상단의{' '}
                  <strong className="font-semibold text-default">[배포하기]</strong> 버튼을 클릭하셔야{' '}
                  <strong className="font-semibold text-default">ARS Flow Builder</strong>에 변경된 목소리가 반영 됩니다.
                </li>
                <li>샘플 보이스 듣기는 '수정 글자 수'가 차감되지 않습니다.</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button buttonStyle="secondary">취소</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button buttonStyle="primary" className="btn-primary-black">
              저장하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default VoiceSettingsModal;
