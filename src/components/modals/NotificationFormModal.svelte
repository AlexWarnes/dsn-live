<script lang="ts">
	import {
		ComposedModal,
		ModalHeader,
		ModalBody,
		ModalFooter,
		Button,
		MultiSelect,
		InlineNotification
	} from 'carbon-components-svelte';
	import { spacecraftMap } from '../../data/referenceData';
	import type { NotificationTrigger } from '../../data/Models';
	import { notificationTriggers } from '../../data/stores';
	import { renderSpacecraftText, renderStationAndDishText } from '../../data/notification.service';

	let triggerValues: NotificationTrigger = {
		id: '',
		spacecraft: [],
		dishes: [],
		stations: []
	};

	const resetForm = () => {
		triggerValues = {
			id: '',
			spacecraft: [],
			dishes: [],
			stations: []
		};
	};

	let dishList = [
		{ id: 'DSS14', text: 'DSS14' },
		{ id: 'DSS24', text: 'DSS24' },
		{ id: 'DSS25', text: 'DSS25' },
		{ id: 'DSS26', text: 'DSS26' },
		{ id: 'DSS34', text: 'DSS34' },
		{ id: 'DSS35', text: 'DSS35' },
		{ id: 'DSS36', text: 'DSS36' },
		{ id: 'DSS43', text: 'DSS43' },
		{ id: 'DSS54', text: 'DSS54' },
		{ id: 'DSS55', text: 'DSS55' },
		{ id: 'DSS56', text: 'DSS56' },
		{ id: 'DSS63', text: 'DSS63' },
		{ id: 'DSS65', text: 'DSS65' }
	];

	let stationList = [
		{ id: 'GOLDSTONE', text: 'GOLDSTONE' },
		{ id: 'CANBERRA', text: 'CANBERRA' },
		{ id: 'MADRID', text: 'MADRID' }
	];

	let spacecraftList = Object.values(spacecraftMap).map((s) => {
		return {
			id: s.id,
			text: `${s.longName} (${s.shortName})`
		};
	});

	function createTrigger() {
		// client-side id for tracking notification triggers
		const id = performance.now().toString();
		const newTrigger = {
			...triggerValues,
			id
		};
		notificationTriggers.update((current) => [newTrigger, ...current]);

		// Close the form
		open = false;

		// Clear the form
		resetForm();
	}

	export let open = false;
</script>

<ComposedModal preventCloseOnClickOutside {open} on:close={() => (open = false)}>
	<ModalHeader title="Notification Trigger" />
	<ModalBody>
		<p>
			Notification triggers set criteria for sending you desktop notifications if you have granted
			permission to this site and the site is open. That means if the tab is closed or permission is
			denied, you will not receive notifications.
		</p>
		<!-- Notify me when these spacecraft are targeted [] | Any -->
		<!-- By these dishes [] | Any -->
		<!-- OR these stations [] -->
		<MultiSelect
			titleText="Spacecraft"
			items={spacecraftList}
			bind:selectedIds={triggerValues.spacecraft}
		/>
		<MultiSelect
			titleText="Stations"
			items={stationList}
			bind:selectedIds={triggerValues.stations}
		/>
		<MultiSelect titleText="Dishes" items={dishList} bind:selectedIds={triggerValues.dishes} />

		<InlineNotification lowContrast hideCloseButton kind="info">
			<h3 slot="title" class="description-title">Trigger Description</h3>
			<p slot="subtitle" class="trigger-description">
				Notify me when {renderSpacecraftText(triggerValues.spacecraft)} spacecraft {triggerValues
					.spacecraft.length > 1
					? 'are'
					: 'is'} targeted{renderStationAndDishText(triggerValues.stations, triggerValues.dishes)}.
			</p>
		</InlineNotification>
	</ModalBody>
	<ModalFooter>
		<Button kind="secondary" on:click={() => (open = false)}>Cancel</Button>
		<Button on:click={createTrigger}>Create</Button>
	</ModalFooter>
</ComposedModal>

<style>
	h3 {
		margin: 15px 8px 0 0;
		font-size: 1.75em;
	}

	.description-title {
		margin: 0;
	}

	.trigger-description {
		margin: 0.75rem 0 0;
		padding: 0;
	}
</style>
