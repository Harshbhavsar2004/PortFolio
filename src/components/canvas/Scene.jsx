import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useTexture, Html, Sparkles, Loader } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import "../../App.css";
import styled from "styled-components";
import { headTextAnimation, headContentAnimation } from "../../utils/motion";
import { motion } from "framer-motion";
import { Bio } from "../../data/constants";
import TypewriterComponent from "typewriter-effect";

const HeroLeftContainer = styled.div`
  color:white;
  margin-left:-80px;
  width: 100%;
  order: 0.5;
  @media (max-width: 960px) {
    margin-left:0px;
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: #A020F0;
`;

const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;

  width: 95%;
  max-width: 300px;
  text-align: center;
  padding: 16px 0;

  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px;
  font-weight: 600;
  font-size: 20px;

  &:hover {
    transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
    filter: brightness(1);
  }

  @media (max-width: 640px) {
    padding: 12px 0;
    font-size: 18px;
  }
  color: white;
`;
export default function Scene() {
  return (
    <>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh"
        }}
        shadows
        flat
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 2, 5], fov: 35 }}
      >
        <directionalLight position={[-5, -5, 5]} intensity={4} />
        <Sparkles count={300} scale={5} />
        <Suspense fallback={null}>
          <EffectComposer>
            <Bloom
              intensity={3.0}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              mipmapBlur={true}
            />
          </EffectComposer>
          <Model />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

function Model() {
  const groupRef = useRef(null);
  const texture = useTexture("./creedi-zhong-cPDYIQ6l65A-unsplas.jpg");
  const { raycaster, camera, mouse } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta;
      groupRef.current.rotation.x += delta / 6;
    }
  });

  const handleClick = (event) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(groupRef.current);

    if (intersects.length > 0) {
      const uv = intersects[0].uv;
      const url = getURLFromUV(uv);
      if (url) {
        window.open(url, "_blank");
      }
    }
  };

  const getURLFromUV = (uv) => {
    if (uv.x < 0.33) {
      return "https://web-examination.vercel.app";
    } else if (uv.x >= 0.33 && uv.x < 0.66) {
      return "https://ai-form-builder-wr1c.vercel.app/";
    } else if (uv.x >= 0.66) {
      return "https://www.tejaswinisales.shop";
    }
    return null;
  };

  return (
    <>
      <Html style={{
        marginTop: "-300px",
        marginLeft: "-500px"
      }}>
        <HeroLeftContainer>
          <motion.div {...headTextAnimation}>
            <Title>
              Hi, I am <br /> {Bio.name}
            </Title>
            <TextLoop>
              I am a
              <Span>
                <TypewriterComponent
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
          </motion.div>

          <motion.div {...headContentAnimation}>
            <SubTitle>{Bio.description}</SubTitle>
          </motion.div>
          <ResumeButton href={Bio.resume} target="_blank">
            Check Resume
          </ResumeButton>
        </HeroLeftContainer>
      </Html>

      <group
        position={[1.5, 0.2, 0]}
        rotation={[Math.PI / 8, -2, 0]}
        onClick={handleClick}
      >
        <mesh ref={groupRef}>
          <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
          <meshBasicMaterial
            map={texture}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={1}
          />
        </mesh>
      </group>
    </>
  );
}
