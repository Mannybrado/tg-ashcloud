import { Component } from 'inferno';
import { useBackend } from '../backend';
import { BlockQuote, Box, Button, ByondUi, Collapsible, Input, LabeledList, NumberInput, ProgressBar, Section, Tabs, Tooltip, Slider, Icon, Knob } from '../components';
import { DraggableControl } from '../components/DraggableControl';

const COLORS_ARBITRARY = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
];

const COLORS_STATES = [
  'good',
  'average',
  'bad',
  'black',
  'white',
];

const PAGES = [
  {
    title: 'Button',
    component: () => KitchenSinkButton,
  },
  {
    title: 'Box',
    component: () => KitchenSinkBox,
  },
  {
    title: 'ProgressBar',
    component: () => KitchenSinkProgressBar,
  },
  {
    title: 'Tabs',
    component: () => KitchenSinkTabs,
  },
  {
    title: 'Tooltip',
    component: () => KitchenSinkTooltip,
  },
  {
    title: 'Input / Slider',
    component: () => KitchenSinkInput,
  },
  {
    title: 'Collapsible',
    component: () => KitchenSinkCollapsible,
  },
  {
    title: 'BlockQuote',
    component: () => KitchenSinkBlockQuote,
  },
  {
    title: 'ByondUi',
    component: () => KitchenSinkByondUi,
  },
];

export const KitchenSink = props => {
  return (
    <Section>
      <Tabs vertical>
        {PAGES.map(page => (
          <Tabs.Tab
            key={page.title}
            label={page.title}>
            {() => {
              const Component = page.component();
              return (
                <Component {...props} />
              );
            }}
          </Tabs.Tab>
        ))}
      </Tabs>
    </Section>
  );
};

const KitchenSinkButton = props => {
  return (
    <Box>
      <Box mb={1}>
        <Button content="Simple" />
        <Button selected content="Selected" />
        <Button altSelected content="Alt Selected" />
        <Button disabled content="Disabled" />
        <Button color="transparent" content="Transparent" />
        <Button icon="cog" content="Icon" />
        <Button icon="power-off" />
        <Button fluid content="Fluid" />
        <Button
          my={1}
          lineHeight={2}
          minWidth={30}
          textAlign="center"
          content="With Box props" />
      </Box>
      <Box mb={1}>
        {COLORS_STATES.map(color => (
          <Button
            key={color}
            color={color}
            content={color} />
        ))}
        <br />
        {COLORS_ARBITRARY.map(color => (
          <Button
            key={color}
            color={color}
            content={color} />
        ))}
        <br />
        {COLORS_ARBITRARY.map(color => (
          <Box inline
            mx="7px"
            key={color}
            color={color}>
            {color}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const KitchenSinkBox = props => {
  return (
    <Box>
      <Box bold>
        bold
      </Box>
      <Box italic>
        italic
      </Box>
      <Box opacity={0.5}>
        opacity 0.5
      </Box>
      <Box opacity={0.25}>
        opacity 0.25
      </Box>
      <Box m={2}>
        m: 2
      </Box>
      <Box textAlign="left">
        left
      </Box>
      <Box textAlign="center">
        center
      </Box>
      <Box textAlign="right">
        right
      </Box>
    </Box>
  );
};

class KitchenSinkProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      progress: 0.5,
    };
  }

  render() {
    const { progress } = this.state;
    return (
      <Box>
        <ProgressBar
          ranges={{
            good: [0.5, Infinity],
            bad: [-Infinity, 0.1],
            average: [0, 0.5],
          }}
          minValue={-1}
          maxValue={1}
          value={progress}>
          Value: {Number(progress).toFixed(1)}
        </ProgressBar>
        <Box mt={1}>
          <Button
            content="-0.1"
            onClick={() => this.setState(prevState => ({
              progress: prevState.progress - 0.1,
            }))} />
          <Button
            content="+0.1"
            onClick={() => this.setState(prevState => ({
              progress: prevState.progress + 0.1,
            }))} />
        </Box>
      </Box>
    );
  }
}

class KitchenSinkTabs extends Component {
  constructor() {
    super();
    this.state = {
      vertical: true,
    };
  }

  render() {
    const { vertical } = this.state;
    const TAB_KEYS = [1, 2, 3, 4, 5].map(x => 'tab_' + x);
    return (
      <Box>
        {'Vertical: '}
        <Button
          inline
          content={String(vertical)}
          onClick={() => this.setState(prevState => ({
            vertical: !prevState.vertical,
          }))} />
        <Box mb={2} />
        <Tabs vertical={vertical}>
          {TAB_KEYS.map(key => (
            <Tabs.Tab
              key={key}
              label={'Label ' + key}>
              {() => (
                <Box>
                  {'Active tab: '}
                  <Box inline color="green">{key}</Box>
                  <BoxOfSampleText mt={2} />
                </Box>
              )}
            </Tabs.Tab>
          ))}
        </Tabs>
      </Box>
    );
  }
}

const KitchenSinkTooltip = props => {
  const positions = [
    'top',
    'left',
    'right',
    'bottom',
    'bottom-left',
    'bottom-right',
  ];
  return (
    <Box>
      <Box>
        <Box inline position="relative" mr={1}>
          Box (hover me).
          <Tooltip content="Tooltip text." />
        </Box>
        <Button
          tooltip="Tooltip text."
          content="Button" />
      </Box>
      <Box mt={1}>
        {positions.map(position => (
          <Button
            key={position}
            color="transparent"
            tooltip="Tooltip text."
            tooltipPosition={position}
            content={position} />
        ))}
      </Box>
    </Box>
  );
};

class KitchenSinkInput extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
      text: 'Sample text',
    };
  }

  render() {
    const { number, text } = this.state;
    return (
      <Box>
        <LabeledList>
          <LabeledList.Item label="Input (onChange)">
            <Input
              value={text}
              onChange={(e, value) => this.setState({
                text: value,
              })} />
          </LabeledList.Item>
          <LabeledList.Item label="Input (onInput)">
            <Input
              value={text}
              onInput={(e, value) => this.setState({
                text: value,
              })} />
          </LabeledList.Item>
          <LabeledList.Item label="NumberInput (onChange)">
            <NumberInput
              animated
              width={10}
              step={1}
              stepPixelSize={5}
              value={number}
              minValue={-100}
              maxValue={100}
              onChange={(e, value) => this.setState({
                number: value,
              })} />
          </LabeledList.Item>
          <LabeledList.Item label="NumberInput (onDrag)">
            <NumberInput
              animated
              width={10}
              step={1}
              stepPixelSize={5}
              value={number}
              minValue={-100}
              maxValue={100}
              onDrag={(e, value) => this.setState({
                number: value,
              })} />
          </LabeledList.Item>
          <LabeledList.Item label="Slider (onDrag)">
            <Slider
              step={1}
              stepPixelSize={5}
              value={number}
              minValue={-100}
              maxValue={100}
              onDrag={(e, value) => this.setState({
                number: value,
              })} />
          </LabeledList.Item>
          <LabeledList.Item label="Knob (onDrag)">
            <Knob
              inline
              size={1}
              step={1}
              stepPixelSize={2}
              value={number}
              minValue={-100}
              maxValue={100}
              onDrag={(e, value) => this.setState({
                number: value,
              })} />
            <Knob
              ml={1}
              inline
              bipolar
              size={1}
              step={1}
              stepPixelSize={2}
              value={number}
              minValue={-100}
              maxValue={100}
              onDrag={(e, value) => this.setState({
                number: value,
              })} />
          </LabeledList.Item>
          <LabeledList.Item label="Rotating Icon">
            <Box inline position="relative">
              <DraggableControl
                value={number}
                minValue={-100}
                maxValue={100}
                dragMatrix={[0, -1]}
                step={1}
                stepPixelSize={5}
                onDrag={(e, value) => this.setState({
                  number: value,
                })}>
                {control => (
                  <Box onMouseDown={control.handleDragStart}>
                    <Icon
                      size={4}
                      color="yellow"
                      name="times"
                      rotation={control.displayValue * 4} />
                    {control.inputElement}
                  </Box>
                )}
              </DraggableControl>
            </Box>
          </LabeledList.Item>
        </LabeledList>
      </Box>
    );
  }
}

const KitchenSinkCollapsible = props => {
  return (
    <Collapsible
      title="Collapsible Demo"
      buttons={(
        <Button icon="cog" />
      )}>
      <Section>
        <BoxOfSampleText />
      </Section>
    </Collapsible>
  );
};

const BoxOfSampleText = props => {
  return (
    <Box {...props}>
      <Box italic>
        Jackdaws love my big sphinx of quartz.
      </Box>
      <Box mt={1} bold>
        The wide electrification of the southern
        provinces will give a powerful impetus to the
        growth of agriculture.
      </Box>
    </Box>
  );
};

const KitchenSinkBlockQuote = props => {
  return (
    <BlockQuote>
      <BoxOfSampleText />
    </BlockQuote>
  );
};

const KitchenSinkByondUi = props => {
  const { config } = useBackend(props);
  return (
    <Box>
      <Section
        title="Button"
        level={2}>
        <ByondUi
          params={{
            type: 'button',
            parent: config.window,
            text: 'Button',
          }} />
      </Section>
    </Box>
  );
};
