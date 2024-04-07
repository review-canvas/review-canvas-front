'use client'

import useSignupStore from "@/store/signup";

function Step6() {
    const { goToNextStep } = useSignupStore();

    return (
        <div>
            <div>샵에 대한 정보를 설정합니다</div>
            <div>Input Group</div>
            <div>
                <button onClick={goToNextStep} type="button">다음 단계로 이동</button>
            </div>
        </div>
    )
}

export default Step6
