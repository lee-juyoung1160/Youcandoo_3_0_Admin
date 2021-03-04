<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Popup extends MY_Controller {

    public function index()
        {
            $this->load->template('v2/popup/popup-list');
        }

    public function create()
        {
            $this->load->template('v2/popup/popup-create');
        }
    public function detail()
            {
                $this->load->template('v2/popup/popup-detail');
            }
}


